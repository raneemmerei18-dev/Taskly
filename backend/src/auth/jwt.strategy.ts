import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JWT Strategy for Passport authentication
 * Extracts JWT from Authorization header and verifies it
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Configure Passport to extract JWT from Bearer token
    // and verify using JWT_SECRET from environment variables
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ||
        'your-secret-key-change-me',
    });
  }

  /**
   * Validate JWT payload and attach user to request
   * @param payload - JWT payload containing sub (userId) and email
   * @returns User data to be attached to request.user
   */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
