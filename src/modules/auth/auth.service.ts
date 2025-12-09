import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { GetUserByUsernameUseCase } from '../users/application/use-cases/user/get-user-by-username.use-case';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleOrmEntity } from '../users/infrastructure/persistence/orm-entities/role.orm-entity';
import { Repository } from 'typeorm';
import { ApiResponseDto } from '../shared/infrastructure/api-response';
import { UserOrmEntity } from '../users/infrastructure/persistence/orm-entities/user.orm-entity';

@Injectable()
export class AuthService {
  constructor(
    private getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private jwtService: JwtService,
    @InjectRepository(RoleOrmEntity)
    private readonly roleRepository: Repository<RoleOrmEntity>,
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,

  ) { }

  async validateUser(username: string, password: string) {
    //const user = await this.getUserByUsernameUseCase.execute(username);
    const user = await this.userRepository.findOne({ where: { username }, relations: ['role'] });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    //const isMatch = await bcrypt.compare(password, user.password.value);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any, res: Response) {    
    const payload = { username: user.username, id: user.id, roleId: user.role.id };
    
    const token = this.jwtService.sign(payload);


    // 1. Enviamos cookie HttpOnly para Angular
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // En producción → true
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hora
      path: '/',
    });

    // 2. También enviamos el token en la respuesta para Postman
    return res.json(
      new ApiResponseDto({
        status: 'success',
        data: {
          access_token: token,
          user,
        }

      }));
  }
}
