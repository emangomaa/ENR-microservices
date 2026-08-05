import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class VerifyOtpDto {
    
  @IsNotEmpty({
    message: 'Email is required.',
  })
  @IsEmail()
  email!: string;
  
  @IsNotEmpty({
    message: 'OTP is required.',
  })
  @IsString()
  otp!: string;


}