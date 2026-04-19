import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Guard for protecting routes
 * Only allows access if valid JWT token is provided in Authorization header
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
