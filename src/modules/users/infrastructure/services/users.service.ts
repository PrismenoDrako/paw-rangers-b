import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../persistence/orm-entities/user.orm-entity';
import { DocTypeOrmEntity } from '../persistence/orm-entities/doctype.orm-entity';
import { UpdateUserDto_ } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserOrmEntity)
		private readonly userRepository: Repository<UserOrmEntity>,

		@InjectRepository(DocTypeOrmEntity)
		private readonly docTypeRepository: Repository<DocTypeOrmEntity>,
	) {}

	/**
	 * Actualiza los datos del usuario autenticado.
	 * @param userId ID del usuario autenticado
	 * @param updateData DTO con los campos permitidos a actualizar
	 * @returns Usuario actualizado
	 */
	async updateOwnUser(userId: number, updateData: UpdateUserDto_): Promise<UserOrmEntity> {
		// Buscar usuario existente
		const user = await this.userRepository.findOne({ where: { id: userId } });
		if (!user) {
			throw new NotFoundException(`Usuario no encontrado`);
		}

		// Manejar relación con docType si se envió docTypeId
		if (updateData.docTypeId !== undefined) {
			const docType = await this.docTypeRepository.findOne({ where: { id: updateData.docTypeId } });
			if (!docType) {
				throw new NotFoundException(`Tipo de documento con ID ${updateData.docTypeId} no encontrado`);
			}
			user.docType = docType;
		}

		// Actualizar los demás campos permitidos
		if (updateData.name !== undefined) user.name = updateData.name;
		if (updateData.lastName1 !== undefined) user.lastName1 = updateData.lastName1;
		if (updateData.lastName2 !== undefined) user.lastName2 = updateData.lastName2;
		if (updateData.docNumber !== undefined) user.docNumber = updateData.docNumber;
		if (updateData.address !== undefined) user.address = updateData.address;
		if (updateData.phone !== undefined) user.phone = updateData.phone;

		// Guardar cambios
		return this.userRepository.save(user);
	}
}
