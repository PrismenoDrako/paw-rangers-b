import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocTypeOrmEntity } from "./../modules/users/infrastructure/persistence/orm-entities/doctype.orm-entity";
import { DeepPartial, Repository } from "typeorm";
import bcrypt from 'bcryptjs';
import { DocType } from "./../modules/users/domain/entities/doctype.entity";
import { Role } from "../modules/users/domain/entities/role.entity";
import { RoleOrmEntity } from "../modules/users/infrastructure/persistence/orm-entities/role.orm-entity";
import { UserOrmEntity } from "../modules/users/infrastructure/persistence/orm-entities/user.orm-entity";


import { SpeciesOrmEntity } from "../modules/pets/infrastructure/persistence/orm-entities/species.orm-entity";
import { BreedOrmEntity } from "../modules/pets/infrastructure/persistence/orm-entities/breed.orm-entity";
import { Species } from "../modules/pets/domain/entities/species.entity";
import { Breed } from "../modules/pets/domain/entities/breed.entity";


@Injectable()
export class DatabaseInitializerService implements OnApplicationBootstrap {
	private readonly logger = new Logger(DatabaseInitializerService.name);

	constructor(
		@InjectRepository(RoleOrmEntity)
		private readonly roleRepository: Repository<RoleOrmEntity>,

		@InjectRepository(DocTypeOrmEntity)
		private readonly docTypeRepository: Repository<DocTypeOrmEntity>,

		@InjectRepository(UserOrmEntity)
		private readonly userRepository: Repository<UserOrmEntity>,

		@InjectRepository(SpeciesOrmEntity)
		private readonly speciesRepository: Repository<SpeciesOrmEntity>,

		@InjectRepository(BreedOrmEntity)
		private readonly breedRepository: Repository<BreedOrmEntity>,
	) { }

	async onApplicationBootstrap() {
		// solo en desarrollo
		if (process.env.NODE_ENV !== 'development') {
			this.logger.log('⏭️ Omitiendo inicialización de datos (no es entorno de desarrollo)');
			return;
		}

		this.logger.log('Iniciando carga de datos iniciales...');
		this.initializeRoles();
		this.initializeDocTypes();
		this.initializeUsers();

		await this.initializeSpecies();
		await this.initializeBreeds();

		this.logger.log('🎉 Datos iniciales cargados correctamente.');
	}

	private async initializeRoles() {
		//Roles iniciales
		const defaultRoles = [
			new Role(0, "Administrador", true),
			new Role(0, "Usuario", false), //Usuario estándar
		];

		for (const role of defaultRoles) {
			const exists = await this.roleRepository.findOneBy({ name: role.name });
			if (!exists) {
				await this.roleRepository.save(role);
				this.logger.log(`✅ Rol creado: ${role.name}`);
			}
		}
	}

	private async initializeDocTypes() {
		// Tipos de documento iniciales
		const defaultDocTypes = [
			new DocType(0, "DNI", "Documento Nacional de Identidad", 8),
			new DocType(0, "Pasaporte", "", 12),
			new DocType(0, "Carnet de Extranjería", "", 12),
		];

		for (const type of defaultDocTypes) {
			const exists = await this.docTypeRepository.findOneBy({ name: type.name });
			if (!exists) {
				await this.docTypeRepository.save(type);
				this.logger.log(`✅ Tipo de documento creado: ${type.name}`);
			}
		}


	}

	private async initializeUsers() {
		const count = await this.userRepository.count();
		if (count > 0) return; // Ya existen usuarios, no hacer nada

		const adminRole = await this.roleRepository.findOne({ where: { name: 'Admin' } });
		const dniType = await this.docTypeRepository.findOne({ where: { name: 'DNI' } });

		// Hash rápido de contraseña (usa bcrypt o algo equivalente)
		const hashedPassword = await bcrypt.hash('admin123', 10);


		const adminUser = this.userRepository.create({
			username: 'admin',
			password: hashedPassword,
			email: 'admin@example.com',
			name: 'Administrador',
			lastName1: 'Principal',
			isActive: true,
			role: adminRole,
			docType: dniType,
			docNumber: '00000000',
			address: 'Oficina central',
		} as DeepPartial<UserOrmEntity>);

		await this.userRepository.save(adminUser);

		console.log('✅ Usuario administrador creado');
	}

	private async initializeSpecies() {
		const defaultSpecies = [
			new Species(0, 'Perro', 'Canis lupus familiaris'),
			new Species(0, 'Gato', 'Felis catus'),
			new Species(0, 'Ave', 'Aves spp.'),
		];

		for (const species of defaultSpecies) {
			const exists = await this.speciesRepository.findOne({ where: { name: species.name } });
			if (!exists) {
				await this.speciesRepository.save(species);
				this.logger.log(`✅ Especie creada: ${species.name}`);
			}
		}
	}

	private async initializeBreeds() {
		// Obtenemos especies existentes
		const perro = await this.speciesRepository.findOne({ where: { name: 'Perro' } });
		const gato = await this.speciesRepository.findOne({ where: { name: 'Gato' } });

		if (!perro || !gato) {
			this.logger.warn('⚠️ No se pudieron inicializar las razas porque no existen especies');
			return;
		}

		const defaultBreeds = [
			new Breed(0, 'Labrador', perro.id),
			new Breed(0, 'Bulldog', perro.id),
			new Breed(0, 'Persa', gato.id),
			new Breed(0, 'Siamés', gato.id),
		];

		for (const breed of defaultBreeds) {
			const exists = await this.breedRepository.findOne({ where: { name: breed.name } });
			if (!exists) {
				await this.breedRepository.save({...breed, species: {id: breed.speciesId} });
				this.logger.log(`✅ Raza creada: ${breed.name}`);
			}
		}
	}
}