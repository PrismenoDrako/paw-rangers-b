import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/controllers/users/users.controller';
import { DoctypesController } from './infrastructure/controllers/doctypes/doctypes.controller';
import { RolesController } from './infrastructure/controllers/roles/roles.controller';
import { GetAllDocTypesUseCase } from './application/use-cases/doctype/get-all-doctypes.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocTypeOrmEntity } from './infrastructure/persistence/orm-entities/doctype.orm-entity';
import { DocTypeRepository } from './infrastructure/persistence/repositories/doctype.repository';
import { IDocTypeRepository } from './domain/repositories/doctype.repository';
import { RoleRepository } from './infrastructure/persistence/repositories/role.repository';
import { IRoleRepository } from './domain/repositories/role.repository';
import { GetAllRolesUseCase } from './application/use-cases/role/get-all-roles.use-case';
import { RoleOrmEntity } from './infrastructure/persistence/orm-entities/role.orm-entity';
import { GetAllUsersUseCase } from './application/use-cases/user/get-all.users.use-case';
import { UserRepository } from './infrastructure/persistence/repositories/user.repository';
import { IUserRepository } from './domain/repositories/user.repository';
import { UserOrmEntity } from './infrastructure/persistence/orm-entities/user.orm-entity';
import { UpdateUserUseCase } from './application/use-cases/user/update-user.use-case';



@Module({

	imports: [
		TypeOrmModule.forFeature([DocTypeOrmEntity, RoleOrmEntity, UserOrmEntity])
	],
	controllers: [UsersController, DoctypesController, RolesController],
	providers: [
		DocTypeRepository, // clase concreta
		{
			provide: IDocTypeRepository, //clase abstracta del dominio
			useExisting: DocTypeRepository, //clase concreta de la infraestructura
		},
		GetAllDocTypesUseCase,
		RoleRepository,
		{
			provide: IRoleRepository,
			useExisting: RoleRepository
		},
		GetAllRolesUseCase,
		UserRepository,
		{
			provide: IUserRepository,
			useExisting: UserRepository
		},
		GetAllUsersUseCase,
		UpdateUserUseCase
	],
	exports: [
		GetAllDocTypesUseCase,
		GetAllRolesUseCase,
		GetAllUsersUseCase,
		UpdateUserUseCase
	],
})
export class UsersModule { }
