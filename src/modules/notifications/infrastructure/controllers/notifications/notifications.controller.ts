import { Controller, Get, Query, UseGuards, Request, Patch, NotFoundException, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { JwtAuthGuard } from '../../../../../modules/auth/jwt/jwt.guard';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  /**
   * Obtiene las notificaciones del usuario autenticado con paginación.
   *
   * @param user - Usuario autenticado (extraído del JWT)
   * @param page - Número de página (por defecto 1)
   * @param size - Cantidad de items por página (por defecto 20)
   * @param isRead - Filtrar por notificaciones leídas (true/false) opcional
   * @returns Lista de notificaciones paginadas con metadata
   */
  @Get()
  @ApiOperation({ summary: 'Obtener notificaciones del usuario con paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página, por defecto 1' })
  @ApiQuery({ name: 'size', required: false, type: Number, description: 'Cantidad de notificaciones por página, por defecto 20' })
  @ApiQuery({ name: 'isRead', required: false, type: Boolean, description: 'Filtrar por notificaciones leídas (true/false)' })
  @ApiOkResponse({
    description: 'Lista de notificaciones paginadas',
    schema: {
      example: {
        data: [
          {
            id: 1,
            userId: 5,
            title: 'Alerta cercana',
            message: 'Se ha detectado un evento cerca de tu ubicación',
            url: '/alerts/10',
            createdAt: '2025-12-10T16:00:00.000Z',
            isRead: false
          }
        ],
        total: 100,
        page: 1,
        size: 20,
        totalPages: 5
      }
    }
  })
  async getNotifications(
    @Request() req: any,
    @Query('page') page = '1',
    @Query('size') size = '20',
    @Query('isRead') isRead?: string,
  ) {
    const pageNumber = Number(page);
    const sizeNumber = Number(size);
    const isReadBool = isRead === 'true' ? true : isRead === 'false' ? false : undefined;

    return this.notificationsService.getUserNotifications(
      req.user.userId,
      pageNumber,
      sizeNumber,
      isReadBool,
    );
  }

  /**
   * Marca una notificación como leída para el usuario autenticado.
   * @param req Usuario autenticado
   * @param id ID de la notificación a marcar como leída
   * @returns La notificación actualizada
   */
  @Patch(':id/read')
  @ApiOperation({ summary: 'Marcar notificación como leída' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la notificación' })
  @ApiOkResponse({
    description: 'Notificación marcada como leída',
    schema: {
      example: {
        id: 1,
        userId: 5,
        title: 'Alerta cercana',
        message: 'Se ha detectado un evento cerca de tu ubicación',
        url: '/alerts/10',
        createdAt: '2025-12-10T16:00:00.000Z',
        isRead: true
      }
    }
  })
  async markAsRead(@Request() req: any, @Param('id') id: string) {
    const notification = await this.notificationsService.markAsRead(req.user.userId, Number(id));
    if (!notification) {
      throw new NotFoundException('Notificación no encontrada');
    }
    return notification;
  }
}
