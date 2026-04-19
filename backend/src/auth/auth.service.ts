import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

/**
 * AuthService handles authentication logic
 * Manages user registration, login, and JWT token generation
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * @param registerDto - Contains email and password
   * @returns JWT token for immediate login after registration
   */
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // Create user (will throw if email already exists)
    const user = await this.usersService.create(email, password);

    // Generate and return JWT token
    const token = this.jwtService.sign({
      sub: user._id.toString(),
      email: user.email,
    });

    return { token };
  }

  /**
   * Authenticate user and generate JWT token
   * @param loginDto - Contains email and password
   * @returns JWT token for authenticated user
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Validate credentials (throws error if invalid)
    const user = await this.usersService.validateUser(email, password);

    // Generate and return JWT token
    const token = this.jwtService.sign({
      sub: user._id.toString(),
      email: user.email,
    });

    return { token };
  }
}
