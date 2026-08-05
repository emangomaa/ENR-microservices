import { IsEmail, IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Matches(/^\d{4}$/, {
    message: 'OTP must contain exactly 4 digits.',
  })
  otp!: string;
}