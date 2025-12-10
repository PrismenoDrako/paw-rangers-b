import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateCollaboratorDto extends CreateUserDto {
  @IsOptional()
  @IsNumber()
  roleId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
