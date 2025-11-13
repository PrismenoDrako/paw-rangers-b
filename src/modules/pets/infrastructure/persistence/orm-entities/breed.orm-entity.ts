import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SpeciesOrmEntity } from "./species.orm-entity";

@Entity('breeds')
export class BreedOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    name: string;

    @ManyToOne(() => SpeciesOrmEntity, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'species_id' })
    species: SpeciesOrmEntity;
}