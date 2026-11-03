import { IsEmail, IsNotEmpty, IsString ,Matches, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {


    @ApiProperty({ example: 'NewStr0ng!Pass', description: 'New password with uppercase, lowercase, number, and special character.' })
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
    @ApiProperty({ example: 'Curr3nt!Pass', description: 'Current password.' })
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

    @ApiProperty({ example: 'NewStr0ng!Pass', minLength: 6, description: 'Must match newPassword.' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    confirmPassword!: string;  
}