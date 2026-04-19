import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * DTO for user login
 * Validates email and password input
 */
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
