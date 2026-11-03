import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com', description: 'Account email address.' })
  @IsNotEmpty({
    message: 'Email is required.',
  })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address.',
    },
  )
  email!: string;

  @ApiProperty({ example: 'Str0ng!Pass', minLength: 8, description: 'Password with uppercase, lowercase, number, and special character.' })
  @IsNotEmpty({
    message: 'Password is required.',
  })
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters.',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    {
      message:
        'Password must contain uppercase, lowercase, number and special character.',
    },
  )
  password!: string;

  @ApiProperty({ example: 'Str0ng!Pass', description: 'Must match password.' })
  @IsNotEmpty({
    message: 'Confirm password is required.',
  })
  confirmPassword!: string;
}