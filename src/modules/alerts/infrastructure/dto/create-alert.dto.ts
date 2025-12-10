import { IsNotEmpty, IsNumber, IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { AlertType } from '../../domain/entities/alert-type.enum';

export class CreateAlertDto {
  @IsNumber()
  speciesId: number;

  @IsOptional()
  @IsNumber()
  breedId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsDateString()
  date: string; // Fecha en formato ISO

  @IsNumber()
  userId: number; // Se asigna desde el request

  @IsOptional()
  @IsNumber()
  stateId: number;

  @IsEnum(AlertType)
  type: AlertType;
}