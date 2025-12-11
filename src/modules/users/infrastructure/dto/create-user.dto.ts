import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
    
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName1: string;

  @IsOptional()
  @IsString()
  lastName2?: string;

  @IsOptional()
  @IsNumber()
  docTypeId?: number;

  @IsOptional()
  @IsString()
  docNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
