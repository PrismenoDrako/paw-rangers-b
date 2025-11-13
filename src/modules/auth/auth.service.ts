import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
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

    // Evitamos devolver el hash
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}