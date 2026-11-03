import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({ example: 'eyJhbGciOi...' })
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}