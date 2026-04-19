import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * DTO for user registration
 * Ensures email is valid and password meets minimum length requirement
 */
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
