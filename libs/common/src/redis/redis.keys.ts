export const RedisKeys = {

    otp(userId: number) {
        return `otp:user:${userId}`;
    },
     resend(userId: number): string {
    return `resend-otp:user:${userId}`;
  },
     resetOtp(userId: number): string {
    return `reset-password:user:${userId}`;
  },
};