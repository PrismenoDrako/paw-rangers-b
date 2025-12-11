import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertStateOrmEntity } from '../modules/alerts/infrastructure/persistence/orm-entities/alert-state.orm-entity';
import { AlertOrmEntity } from '../modules/alerts/infrastructure/persistence/orm-entities/alert.orm-entity';
import { PetOrmEntity } from '../modules/pets/infrastructure/persistence/orm-entities/pet.orm-entity';
import { UserOrmEntity } from '../modules/users/infrastructure/persistence/orm-entities/user.orm-entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { BcryptPasswordHasher } from '../modules/users/infrastructure/services/hasher.service';
import { RoleOrmEntity } from '../modules/users/infrastructure/persistence/orm-entities/role.orm-entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly userRepo: Repository<UserOrmEntity>,

        @InjectRepository(PetOrmEntity)
        private readonly petRepo: Repository<PetOrmEntity>,

        @InjectRepository(AlertOrmEntity)
        private readonly alertRepo: Repository<AlertOrmEntity>,

        @InjectRepository(AlertStateOrmEntity)
        private readonly alertStateRepo: Repository<AlertStateOrmEntity>,


        @InjectRepository(RoleOrmEntity)
        private readonly roleRepo: Repository<RoleOrmEntity>,

        private readonly passwordHasher: BcryptPasswordHasher,

    ) { }


    async generateUsers(count: number) {
        const users: any = [];

        for (let i = 0; i < count; i++) {
            const hashedPassword = await this.passwordHasher.hash('123456');

            const user = this.userRepo.create({
                username: faker.internet.username(),
                password: hashedPassword,
                email: faker.internet.email(),
                name: faker.person.firstName(),
                lastName1: faker.person.lastName(),
                lastName2: faker.person.lastName(),
                role: this.roleRepo.create(
                    {
                        id: 2
                    }
                ),
                isActive: true,
            });

            users.push(user);
        }

        const savedUsers = await this.userRepo.save(users);
        console.log(`${savedUsers.length} usuarios generados con role 2`);
        return savedUsers;
    }


    async generateData(){
        console.log("Generando usuarios dummy")
        this.generateUsers(5);
    }

}
