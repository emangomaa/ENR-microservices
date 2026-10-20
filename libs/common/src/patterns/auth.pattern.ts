export const AUTH_PATTERNS = {
    LOGIN: { cmd: 'auth.login' },
    LOGOUT: { cmd: 'auth.logout' },
    SIGNUP: { cmd: 'auth.signup' },
    VERIFY_OTP: { cmd: 'auth.verify-otp' },
    RESEND_OTP: { cmd: 'auth.resend-otp' },
    AUTH_VERIFIED: { cmd: 'auth.verified' },
    CHANGE_PASSWORD: { cmd: 'auth.change-password' },
    FORGOT_PASSWORD: { cmd: 'auth.forgot-password' },
    RESET_PASSWORD: { cmd: 'auth.reset-password' },
    REFRESH_TOKEN: { cmd: 'auth.refresh-token' },
};