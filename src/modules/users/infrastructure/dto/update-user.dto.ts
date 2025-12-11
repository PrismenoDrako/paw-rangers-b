import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDto_ {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	lastName1?: string;

	@IsOptional()
	@IsString()
	lastName2?: string;

	@IsOptional()
	@IsNumber()
	docTypeId?: number; // para actualizar la relación con DocType

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
