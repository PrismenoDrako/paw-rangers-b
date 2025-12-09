import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlertOrmEntity } from "./alert.orm-entity";

@Entity('alert_images')
export class AlertImageOrmEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Index() // índice para búsquedas por alertId
    @Column()
    alertId: number;

    @Column({ type: 'varchar', length: 500 })
    url: string;

    @Column({ type: 'int' })
    order: number;

    @ManyToOne(
        () => AlertOrmEntity,
        alert => alert.images,
        { onDelete: 'CASCADE' } // si se elimina la alerta, se eliminan sus imágenes
    )
    alert: AlertOrmEntity;
}