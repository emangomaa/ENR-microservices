import { IsEmail, IsNotEmpty, IsString ,Matches, MinLength } from "class-validator";

export class ChangePasswordDto {


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
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        {
          message:
            'Password must contain uppercase, lowercase, number and special character.',
        },
      )
    currentPassword!: string;  

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    confirmPassword!: string;  
}