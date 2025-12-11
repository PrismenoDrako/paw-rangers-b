import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { StatsService } from './stats.service';

/**
 * Controlador encargado de exponer estadísticas generales del sistema.
 * 
 * Incluye:
 * - Estadísticas del dashboard (usuarios y alertas por mes)
 * - Estadísticas detalladas de alertas por tipo y estado
 * 
 * @category Controllers
 */
@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) { }

  /**
   * Obtiene las estadísticas generales del sistema para el dashboard.
   * 
   * Incluye:
   * - Total de usuarios
   * - Nuevos usuarios en los últimos 30 días
   * - Usuarios agrupados por mes
   * - Alertas agrupadas por estado y por mes
   *
   * @returns Objeto con estadísticas del dashboard
   */
  @Get()
  @ApiOperation({ summary: 'Obtener estadísticas generales del sistema' })
  @ApiOkResponse({
    description: 'Estadísticas del sistema obtenidas correctamente',
    schema: {
      example: {
        users: {
          total: 150,
          newLast30Days: 18,
          byMonth: [
            { month: "2025-03", total: "12" },
            { month: "2025-04", total: "15" }
          ]
        },
        alerts: {
          active: 27,
          resolved: 80,
          unresolved: 11,
          byMonth: [
            { month: "2025-03", active: "2", resolved: "5", unresolved: "1" }
          ]
        }
      }
    }
  })
  async getDashboardStats() {
    return this.statsService.getDashboardStats();
  }

  /**
   * Obtiene estadísticas detalladas de alertas.
   * 
   * Incluye:
   * - Total de alertas
   * - Total de alertas de tipo `FOUND` y `LOST`
   * - Alertas agrupadas por estado:
   *   - ACTIVE
   *   - RESOLVED
   *   - UNRESOLVED
   *
   * @returns Objeto con estadísticas específicas de alertas
   */
  @Get('alerts')
  @ApiOperation({ summary: 'Obtener estadísticas detalladas de alertas' })
  @ApiOkResponse({
    description: 'Estadísticas de alertas obtenidas correctamente',
    schema: {
      example: {
        total: 120,
        totalFound: 45,
        totalLost: 75,
        found: {
          active: 10,
          resolved: 30,
          unresolved: 5
        },
        lost: {
          active: 20,
          resolved: 40,
          unresolved: 15
        }
      }
    }
  })
  async getAlertStats() {
    return this.statsService.getAlertStats();
  }

  /**
   * Obtiene un listado paginado de usuarios del sistema.
   *
   * Cada usuario incluye:
   * - Información personal básica
   * - Tipo de documento
   * - Rol asignado (id, nombre, isCollaborator)
   *
   * @param page Número de página (por defecto 1)
   * @param size Cantidad de usuarios por página (por defecto 10)
   *
   * @returns Objeto con metadatos de paginación y el listado de usuarios
   */
  @Get('users')
  @ApiOperation({ summary: 'Obtener listado paginado de usuarios del sistema' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Número de página (por defecto 1)'
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    example: 10,
    description: 'Cantidad de resultados por página (por defecto 10)'
  })
  @ApiOkResponse({
    description: 'Listado de usuarios obtenido correctamente',
    schema: {
      example: {
        page: 1,
        size: 10,
        total: 42,
        totalPages: 5,
        data: [
          {
            id: 1,
            username: "jdoe",
            email: "jdoe@example.com",
            name: "John",
            lastName1: "Doe",
            lastName2: null,
            docType: "DNI",
            docNumber: "12345678",
            address: "Av. Lima 123",
            role: {
              id: 2,
              name: "admin",
              isCollaborator: true
            },
            isActive: true,
            createdAt: "2025-01-10T12:15:00Z",
            updatedAt: "2025-02-01T08:10:00Z"
          }
        ]
      }
    }
  })
  async getUsersStats(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10
  ) {
    return this.statsService.getUsersStats(Number(page), Number(size));
  }
}
