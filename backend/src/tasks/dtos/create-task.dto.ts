import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO for creating a new task
 */
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title!: string;
}
