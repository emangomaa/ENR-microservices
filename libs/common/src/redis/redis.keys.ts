export const RedisKeys = {

    otp(userId: number) {
        return `otp:user:${userId}`;
    },
     resend(userId: number): string {
    return `resend:user:${userId}`;
  },
};