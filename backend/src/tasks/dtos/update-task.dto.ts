import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * DTO for updating a task
 * Both fields are optional - can update title, completed status, or both
 */
export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  title?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
