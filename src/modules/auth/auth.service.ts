import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { GetUserByUsernameUseCase } from '../users/application/use-cases/user/get-user-by-username.use-case';

@Injectable()
export class AuthService {
  constructor(
    private getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.getUserByUsernameUseCase.execute(username);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password.value);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any, res: Response) {
    const payload = { username: user.username, id: user.id };
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
    return res.json({
      message: 'Login exitoso',
      access_token: token,
      user,
    });
  }
}
