import { IsOptional, IsNumber, IsString, IsEnum, IsDateString } from 'class-validator';
import { AlertType } from '../../domain/entities/alert-type.enum';

export class UpdateAlertDto {
  @IsOptional()
  @IsNumber()
  speciesId?: number;

  @IsOptional()
  @IsNumber()
  breedId?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsNumber()
  stateId?: number;

  @IsOptional()
  @IsEnum(AlertType)
  type?: AlertType;
}
