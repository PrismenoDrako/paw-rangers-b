import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BreedOrmEntity } from "./breed.orm-entity";

@Entity('species')
export class SpeciesOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    scientificName: string;

    // Relación con BreedOrmEntity
    @OneToMany(() => BreedOrmEntity, breed => breed.species)
    breeds: BreedOrmEntity[];
}