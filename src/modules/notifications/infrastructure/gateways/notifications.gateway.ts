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
        const handshake = client.handshake;

        /** 1) Authorization: Bearer xx.xx.xx */
        const authHeader = handshake.headers?.authorization;
        if (typeof authHeader === 'string') {
            const [scheme, token] = authHeader.split(' ');
            if (scheme === 'Bearer' && token) {
                return token;
            }
        }

        /** 2) access_token en handshake (ej: io(url, { auth: { access_token } }) ) */
        const accessToken = (handshake as any).access_token;
        if (typeof accessToken === 'string') {
            return accessToken;
        }

        /** 3) auth.token como fallback */
        const tokenFromAuth = (handshake as any).auth?.token;
        if (typeof tokenFromAuth === 'string') {
            return tokenFromAuth;
        }

        /** 4) Buscar en cookies: access_token=xxx */
        const cookieHeader = handshake.headers?.cookie;
        if (typeof cookieHeader === 'string') {
            const cookies = cookieHeader.split(';').map(c => c.trim());
            for (const cookie of cookies) {
                if (cookie.startsWith('access_token=')) {
                    return cookie.replace('access_token=', '');
                }
            }
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
