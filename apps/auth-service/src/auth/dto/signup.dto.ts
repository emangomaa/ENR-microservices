import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignupDto {
    
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

  @IsNotEmpty({
    message: 'Confirm password is required.',
  })
  confirmPassword!: string;
}