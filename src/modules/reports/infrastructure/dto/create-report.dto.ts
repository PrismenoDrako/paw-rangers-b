import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateReportDto {
	@IsNumber()
	alertId: number;

	@IsString()
	@IsNotEmpty()
	reason: string;

	@IsString()
	@IsOptional()
	comments?: string;
}
