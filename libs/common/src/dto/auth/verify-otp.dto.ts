import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty({
    message: 'Email is required.',
  })
  @IsEmail()
  email!: string;
  @ApiProperty({ example: '123456', description: 'One-time password sent to the email address.' })
  @IsNotEmpty({
    message: 'OTP is required.',
  })
  @IsString()
  otp!: string;


}