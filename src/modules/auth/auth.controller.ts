import { Body, Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(
        @Body() body: { username: string; password: string },
        @Res() res: Response,
    ) {
        const user = await this.authService.validateUser(body.username, body.password);
        return this.authService.login(user, res);
    }

    @Post('logout')
    logout(@Res() res: Response) {
        res.cookie('access_token', '', {
            httpOnly: true,
            maxAge: 0,
            sameSite: 'lax',
            secure: false,
        });

        return res.json({ message: 'Logout OK' });
    }


    @UseGuards(JwtAuthGuard)
    @Post('check')
    check(@Request() req) {
        return { message: 'Token válido', user: req.user };
    }

}