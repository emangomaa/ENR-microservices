import { IsEmail, IsNotEmpty, IsString ,Matches, MinLength } from "class-validator";

export class ResetPasswordDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    otp!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

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