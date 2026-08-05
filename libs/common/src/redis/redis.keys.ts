export const RedisKeys = {

    otp(userId: number) {
        return `otp:user:${userId}`;
    },

};