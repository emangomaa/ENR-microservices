import {
  Injectable,
} from '@nestjs/common';

import {
  randomBytes,
  createHash,
  randomUUID,
} from 'crypto';
import { RedisService } from 'libs/common';



export interface RefreshSession {
  userId: number;
  tokenHash: string;
  createdAt: string;
  expiresAt: string;
}

@Injectable()
export class SessionService {
  private readonly refreshTokenTtl =
    60 * 60 * 24 * 7; // 7 days

  constructor(
    private readonly redisService: RedisService,
  ) {}

  private getSessionKey(
    userId: number,
    sessionId: string,
  ): string {
    return `session:user:${userId}:${sessionId}`;
  }

  private getUserSessionsKey(
    userId: number,
  ): string {
    return `sessions:user:${userId}`;
  }

  private hashToken(
    token: string,
  ): string {
    return createHash('sha256')
      .update(token)
      .digest('hex');
  }

  async createSession(
    userId: number,
  ): Promise<{
    refreshToken: string;
    sessionId: string;
  }> {
    const secret =
      randomBytes(64).toString('hex');

    const sessionId =
      randomUUID();

      const refreshToken = 
      `${userId}.${sessionId}.${secret}`;

    const tokenHash =
      this.hashToken(refreshToken);

    const createdAt =
      new Date();

    const expiresAt =
      new Date(
        createdAt.getTime() +
          this.refreshTokenTtl * 1000,
      );

    const session: RefreshSession = {
      userId,
      tokenHash,
      createdAt:
        createdAt.toISOString(),
      expiresAt:
        expiresAt.toISOString(),
    };

    const sessionKey =
      this.getSessionKey(
        userId,
        sessionId,
      );

    await this.redisService.setObject(
      sessionKey,
      session,
      this.refreshTokenTtl,
    );

    await this.redisService.sadd(
      this.getUserSessionsKey(userId),
      sessionId,
    );

    return {
      refreshToken,
      sessionId,
    };
  }

  async getSession(
  userId: number,
  sessionId: string,
): Promise<RefreshSession | null> {
  const value =
    await this.redisService.getObject<RefreshSession>(
      this.getSessionKey(
        userId,
        sessionId,
      ),
    );

  if (!value) {
    return null;
  }

  return value;
}
  async validateSession(
    userId: number,
    sessionId: string,
    refreshToken: string,
  ): Promise<boolean> {
    const key =
      this.getSessionKey(
        userId,
        sessionId,
      );

    const value =
      await this.redisService.getObject<RefreshSession>(key);

    if (!value) {
      return false;
    }

    const session:
      RefreshSession =
      value;

    const tokenHash =
      this.hashToken(refreshToken);

    return (
      session.tokenHash ===
      tokenHash
    );
  }

  async deleteSession(
    userId: number,
    sessionId: string,
  ): Promise<void> {
    await this.redisService.del(
      this.getSessionKey(
        userId,
        sessionId,
      ),
    );

    await this.redisService.srem(
      this.getUserSessionsKey(userId),
      sessionId,
    );
  }

  async deleteAllSessions(
    userId: number,
  ): Promise<void> {
    const sessionsKey =
      this.getUserSessionsKey(userId);

    const sessionIds =
      await this.redisService.smembers(
        sessionsKey,
      );

    for (const sessionId of sessionIds) {
      await this.redisService.del(
        this.getSessionKey(
          userId,
          sessionId,
        ),
      );
    }

    await this.redisService.del(
      sessionsKey,
    );
  }
}