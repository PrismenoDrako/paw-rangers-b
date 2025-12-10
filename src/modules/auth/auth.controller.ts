import { Body, Controller, Post, UseGuards, Request, Res, HttpCode } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';

import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

class LoginDto {
  username: string;
  password: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ------------------------- LOGIN -------------------------
  @Post('login')
  @HttpCode(200)
  @ApiBody({
    description: 'Credenciales para iniciar sesión',
    type: LoginDto,
    examples: {
      adminLogin: {
        summary: "Ejemplo de admin",
        value: {
          username: 'admin',
          password: 'admin123',
        }
      },
      userLogin: {
        summary: "Ejemplo de usuario normal",
        value: {
          username: 'usuario1',
          password: 'mypassword',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso. Devuelve token en cookie HttpOnly',
    schema: {
      example: {
        message: 'Login exitoso',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(
    @Body() body: LoginDto,
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(body.username, body.password);
    return this.authService.login(user, res);
  }

  // ------------------------- LOGOUT -------------------------
  @Post('logout')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Logout exitoso. La cookie del token queda invalidada.',
    schema: {
      example: {
        message: 'Logout OK',
      },
    },
  })
  logout(@Res() res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      maxAge: 0,
      sameSite: 'lax',
      secure: false,
    });

    return res.json({ message: 'Logout OK' });
  }

  // ------------------------- CHECK TOKEN -------------------------
  @UseGuards(JwtAuthGuard)
  @Post('check')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Token válido',
    schema: {
      example: {
        message: 'Token válido',
        user: {
          id: 1,
          username: 'admin',
          role: 'ADMIN',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
  check(@Request() req) {
    return { message: 'Token válido', user: req.user };
  }
}
