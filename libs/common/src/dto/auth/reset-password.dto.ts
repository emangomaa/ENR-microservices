import { IsEmail, IsNotEmpty, IsString ,Matches, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {

    @ApiProperty({ example: '123456', minLength: 4, description: 'One-time password sent to the email address.' })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    otp!: string;

    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    @ApiProperty({ example: 'Str0ng!Pass', description: 'New password with uppercase, lowercase, number, and special character.' })
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ example: 'Str0ng!Pass', minLength: 6, description: 'Must match newPassword.' })
    @IsNotEmpty()
    @IsString()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        {
          message:
            'Password must contain uppercase, lowercase, number and special character.',
        },
      )
    newPassword!: string;  

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    confirmPassword!: string;  
}