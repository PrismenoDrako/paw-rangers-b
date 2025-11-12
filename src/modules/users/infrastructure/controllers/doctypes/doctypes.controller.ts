import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponseDto } from './../../../../shared/infrastructure/api-response';
import { DocTypeDto } from './../../../application/dto/doctype/doctype.dto';
import { GetAllDocTypesUseCase } from './../../../application/use-cases/doctype/get-all-doctypes.use-case';




@Controller('doctypes')
export class DoctypesController {
    constructor(
		private readonly getAllDocTypesUseCase: GetAllDocTypesUseCase,
	) {}
    
    @Get()
	async getAll() {
		const doctypes: DocTypeDto[] = await this.getAllDocTypesUseCase.execute();
		return new ApiResponseDto({ status: 'success', data: doctypes });
	}

	// @Get(':id')
	// async getById(@Param('id') id: string) {
	// 	const doctype: DocTypeDto = await this.getDocTypeByIdUseCase.execute(Number(id));
	// 	return new ApiResponseDto({ status: 'success', data: doctype });
	// }

	// @Post()
	// async create(@Body() dto: CreateDocTypeDto) {
	// 	const doctype: DocTypeDto = await this.createDocTypeUseCase.execute(dto);
	// 	return new ApiResponseDto({ status: 'success', data: doctype });
	// }

	// @Put(':id')
	// async update(@Body() dto: UpdateDocTypeDto) {
	// 	const doctype: DocTypeDto = await this.updateDocTypeUseCase.execute(Number(dto.id), dto);
	// 	return new ApiResponseDto({ status: 'success', data: doctype });
	// }

	// @Delete(':id')
	// async delete(@Param('id') id: string) {
	// 	await this.deleteDocTypeUseCase.execute(Number(id));
	// 	return new ApiResponseDto({ status: 'success', message: 'DocType deleted' });
	// }
}
