import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';

/**
 * UsersService handles all user-related operations
 * Manages user creation and password hashing
 */
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Create a new user with hashed password
   * @param email - User email
   * @param password - Plain text password (will be hashed)
   * @returns Created user document
   * @throws ConflictException if email already exists
   */
  async create(email: string, password: string) {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password using bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });

    return newUser.save();
  }

  /**
   * Find user by email
   * @param email - User email to search for
   * @returns User document if found, null otherwise
   */
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  /**
   * Validate user credentials (used during login)
   * @param email - User email
   * @param password - Plain text password
   * @returns User document if credentials are valid
   * @throws BadRequestException if credentials are invalid
   */
  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // Compare plain text password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
