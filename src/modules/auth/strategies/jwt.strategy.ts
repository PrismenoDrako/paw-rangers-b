import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const cookieOrHeaderExtractor = (req) => {
  const token =
    req?.cookies?.access_token ||
    ExtractJwt.fromAuthHeaderAsBearerToken()(req);

  if (!token) {
    throw new UnauthorizedException('Token not found');
  }

  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieOrHeaderExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super_secret_key',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.id,
      username: payload.username,
      roleId: payload.roleId,
    };
  }
}
