import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RoleOrmEntity } from '../users/infrastructure/persistence/orm-entities/role.orm-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../users/infrastructure/persistence/orm-entities/user.orm-entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([RoleOrmEntity, UserOrmEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret_key',
      signOptions: { expiresIn: '15m' }, //duración del token
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
