import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Clase base para entidades ORM que requieren trazabilidad temporal.
 * 
 * Proporciona las columnas `createdAt` y `updatedAt` utilizadas
 * automáticamente por TypeORM al crear o actualizar registros.
 */
export abstract class BaseOrmEntity {
	/** Fecha de creación del registro. */
	@CreateDateColumn()
	createdAt: Date;

	/** Fecha de última actualización del registro. */
	@UpdateDateColumn()
	updatedAt: Date;
}