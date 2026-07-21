import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsEmail()
  email!: string;


  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;


  @IsString()
  dateOfBirth!:string;

}