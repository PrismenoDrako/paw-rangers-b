import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { UserOrmEntity } from '../users/infrastructure/persistence/orm-entities/user.orm-entity';
import { AlertOrmEntity } from '../alerts/infrastructure/persistence/orm-entities/alert.orm-entity';
import { AlertStateOrmEntity } from '../alerts/infrastructure/persistence/orm-entities/alert-state.orm-entity';
import { AlertType } from '../alerts/domain/entities/alert-type.enum';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly userRepository: Repository<UserOrmEntity>,
        @InjectRepository(AlertOrmEntity)
        private readonly alertRepository: Repository<AlertOrmEntity>,
        @InjectRepository(AlertStateOrmEntity)
        private readonly alertStateRepository: Repository<AlertStateOrmEntity>
    ) {
    }


    async getDashboardStats() {
        const now = new Date();
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        /* -----------------------------------------
           OBTENER IDs REALES DE LOS ESTADOS
        ----------------------------------------- */

        const states = await this.alertStateRepository.find();

        const ACTIVE_ID = states.find(s => s.name === "ACTIVE")?.id;
        const RESOLVED_ID = states.find(s => s.name === "RESOLVED")?.id;
        const UNRESOLVED_ID = states.find(s => s.name === "UNRESOLVED")?.id;

        if (!ACTIVE_ID || !RESOLVED_ID || !UNRESOLVED_ID) {
            throw new Error("No se encontraron los estados ACTIVE, RESOLVED o UNRESOLVED en alert_states");
        }

        /* -----------------------------------------
           USUARIOS
        ----------------------------------------- */

        const totalUsers = await this.userRepository.count();

        const newUsers = await this.userRepository.count({
            where: { createdAt: MoreThan(last30Days) }
        });

        const usersByMonth = await this.userRepository
            .createQueryBuilder("u")
            .select("TO_CHAR(u.createdAt, 'YYYY-MM')", "month")
            .addSelect("COUNT(*)", "total")
            .groupBy("month")
            .orderBy("month", "ASC")
            .getRawMany();

        /* -----------------------------------------
           ALERTAS
        ----------------------------------------- */

        const activeAlerts = await this.alertRepository.count({
            where: { stateId: ACTIVE_ID }
        });

        const resolvedAlerts = await this.alertRepository.count({
            where: { stateId: RESOLVED_ID }
        });

        const unresolvedAlerts = await this.alertRepository.count({
            where: { stateId: UNRESOLVED_ID }
        });

        // Alertas por mes con los IDs reales
        const alertsByMonth = await this.alertRepository
            .createQueryBuilder("a")
            .select("TO_CHAR(a.createdAt, 'YYYY-MM')", "month")
            .addSelect(
                `SUM(CASE WHEN a.stateId = ${ACTIVE_ID} THEN 1 ELSE 0 END)`,
                "active"
            )
            .addSelect(
                `SUM(CASE WHEN a.stateId = ${RESOLVED_ID} THEN 1 ELSE 0 END)`,
                "resolved"
            )
            .addSelect(
                `SUM(CASE WHEN a.stateId = ${UNRESOLVED_ID} THEN 1 ELSE 0 END)`,
                "unresolved"
            )
            .groupBy("month")
            .orderBy("month", "ASC")
            .getRawMany();

        return {
            users: {
                total: totalUsers,
                newLast30Days: newUsers,
                byMonth: usersByMonth,
            },
            alerts: {
                active: activeAlerts,
                resolved: resolvedAlerts,
                unresolved: unresolvedAlerts,
                byMonth: alertsByMonth
            }
        };
    }

    async getAlertStats() {
        /* -----------------------------------------
           OBTENER IDs REALES DE LOS ESTADOS
        ----------------------------------------- */
        const states = await this.alertStateRepository.find();

        const ACTIVE_ID = states.find(s => s.name === "ACTIVE")?.id;
        const RESOLVED_ID = states.find(s => s.name === "RESOLVED")?.id;
        const UNRESOLVED_ID = states.find(s => s.name === "UNRESOLVED")?.id;

        if (!ACTIVE_ID || !RESOLVED_ID || !UNRESOLVED_ID) {
            throw new Error("No se encontraron los estados ACTIVE, RESOLVED o UNRESOLVED en alert_states");
        }

        /* -----------------------------------------
           TOTALES GENERALES
        ----------------------------------------- */

        const totalAlerts = await this.alertRepository.count();

        const totalFound = await this.alertRepository.count({
            where: { type: AlertType.FOUND }
        });

        const totalLost = await this.alertRepository.count({
            where: { type: AlertType.LOST }
        });

        /* -----------------------------------------
           HALLAZGOS POR STATE
        ----------------------------------------- */
        const foundActive = await this.alertRepository.count({
            where: { type: AlertType.FOUND, stateId: ACTIVE_ID }
        });

        const foundResolved = await this.alertRepository.count({
            where: { type: AlertType.FOUND, stateId: RESOLVED_ID }
        });

        const foundUnresolved = await this.alertRepository.count({
            where: { type: AlertType.FOUND, stateId: UNRESOLVED_ID }
        });

        /* -----------------------------------------
           DESAPARICIONES POR STATE
        ----------------------------------------- */
        const lostActive = await this.alertRepository.count({
            where: { type: AlertType.LOST, stateId: ACTIVE_ID }
        });

        const lostResolved = await this.alertRepository.count({
            where: { type: AlertType.LOST, stateId: RESOLVED_ID }
        });

        const lostUnresolved = await this.alertRepository.count({
            where: { type: AlertType.LOST, stateId: UNRESOLVED_ID }
        });

        /* -----------------------------------------
           RESPUESTA FINAL
        ----------------------------------------- */

        return {
            total: totalAlerts,
            totalFound: totalFound,
            totalLost: totalLost,

            found: {
                active: foundActive,
                resolved: foundResolved,
                unresolved: foundUnresolved,
            },

            lost: {
                active: lostActive,
                resolved: lostResolved,
                unresolved: lostUnresolved,
            }
        };
    }

    /**
     * Obtiene una lista paginada de usuarios, incluyendo su información básica,
     * tipo de documento y rol asociado. Los resultados se devuelven sin campos
     * sensibles (como contraseñas) y ordenados por fecha de creación.
     *
     * Esta función realiza:
     *  - Consulta paginada a la tabla `users`.
     *  - Carga de relaciones: `role` y `docType`.
     *  - Sanitización de campos sensibles.
     *  - Construcción de metadatos de paginación.
     *
     * @param {number} [page=1] - Número de página a consultar (1-indexado).
     * @param {number} [size=10] - Cantidad de usuarios por página.
     *
     * @returns {Promise<{
     *   page: number;
     *   size: number;
     *   total: number;
     *   totalPages: number;
     *   data: Array<{
     *     id: number;
     *     username: string;
     *     email: string;
     *     name: string;
     *     lastName1: string;
     *     lastName2: string | null;
     *     docType: string | null;
     *     docNumber: string | null;
     *     address: string | null;
     *     role: {
     *       id: number;
     *       name: string;
     *       isCollaborator: boolean;
     *     } | null;
     *     isActive: boolean;
     *     createdAt: Date;
     *     updatedAt: Date;
     *   }>;
     * }>}
     * Retorna un objeto que contiene:
     *  - `page`: Página actual.
     *  - `size`: Cantidad de elementos por página.
     *  - `total`: Total de usuarios registrados.
     *  - `totalPages`: Cantidad total de páginas calculadas.
     *  - `data`: Arreglo de usuarios con datos sanitizados.
     */
    async getUsersStats(page: number = 1, size: number = 10) {
        const take = size;
        const skip = (page - 1) * size;

        // Total de usuarios para la paginación
        const total = await this.userRepository.count();

        // Consulta paginada
        const users = await this.userRepository.find({
            relations: ['role', 'docType'],
            order: { createdAt: 'DESC' },
            skip,
            take
        });

        // Sanitizar campos sensibles
        const data = users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
            lastName1: user.lastName1,
            lastName2: user.lastName2 ?? null,
            docType: user.docType ? user.docType.name : null,
            docNumber: user.docNumber ?? null,
            address: user.address ?? null,

            role: user.role
                ? {
                    id: user.role.id,
                    name: user.role.name,
                    isCollaborator: user.role.isCollaborator
                }
                : null,

            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));

        return {
            page,
            size,
            total,
            totalPages: Math.ceil(total / size),
            data
        };
    }
}