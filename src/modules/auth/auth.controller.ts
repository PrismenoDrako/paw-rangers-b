import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.authService.validateUser(
            body.username,
            body.password,
        );
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('check')
    check(@Request() req) {
        return { message: 'Token válido', user: req.user };
    }

}