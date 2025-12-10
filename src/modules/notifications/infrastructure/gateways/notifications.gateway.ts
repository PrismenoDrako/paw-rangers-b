import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';

import { ConnectedSocket } from '@nestjs/websockets';

@WebSocketGateway({
    cors: {
        origin: process.env.FRONTEND_ORIGIN || 'http://localhost:4200',
        credentials: true,
    },
    namespace: '/', // o '/notifications'
})
@Injectable()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger = new Logger(NotificationsGateway.name);

    constructor(private readonly jwtService: JwtService) { }

    // Validar token en handshake y unir al usuario a su sala
    async handleConnection(client: Socket) {
        try {
            const token = this.extractTokenFromClient(client);
            if (!token) {
                this.logger.warn(`Conexión rechazada: token ausente socketId=${client.id}`);
                client.disconnect(true);
                return;
            }

            const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            const userId = payload.sub ?? payload.id ?? payload.userId;

            if (!userId) {
                client.disconnect(true);
                return;
            }

            // Unir al socket a una sala por userId
            client.join(`user_${userId}`);
            this.logger.log(`User ${userId} connected (socket ${client.id})`);
        } catch (err) {
            this.logger.warn(`JWT inválido: ${err.message}`);
            client.disconnect(true);
        }
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Socket disconnected ${client.id}`);
    }

    // helper para extraer token de handshake (query or headers)
    private extractTokenFromClient(client: Socket): string | null {
        // 1) try auth in query (socket.io client: io(url, { auth: { token } }))
        const auth = (client.handshake as any).auth;
        if (auth && auth.token) return auth.token as string;

        // 2) try headers (less common)
        const headers = client.handshake.headers || {};
        if (headers.authorization && typeof headers.authorization === 'string') {
            const parts = headers.authorization.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
        }

        return null;
    }

    // Emitir a un usuario
    emitToUser(userId: number, payload: any) {
        console.log(userId);
        this.server.to(`user_${userId}`).emit('notification', payload);
    }

    // También se puede manejar mensajes entrantes del cliente
    @SubscribeMessage('ping')
    handlePing(@MessageBody() payload: any, @ConnectedSocket() client: Socket) {
        console.log('Ping recibido');
        client.emit('pong', { ...payload });
    }
}
