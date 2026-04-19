import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

/**
 * TasksController handles task endpoints
 * All routes are protected with JWT authentication
 */
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Create a new task
   * POST /tasks
   * @param createTaskDto - Task title
   * @param user - Current authenticated user
   * @returns Created task
   */
  @Post()
  create(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @CurrentUser() user: any,
  ) {
    return this.tasksService.create(createTaskDto, user.userId);
  }

  /**
   * Get all tasks for current user
   * GET /tasks
   * @param user - Current authenticated user
   * @returns Array of user's tasks
   */
  @Get()
  findAll(@CurrentUser() user: any) {
    return this.tasksService.findAll(user.userId);
  }

  /**
   * Get a specific task by ID
   * GET /tasks/:id
   * @param id - Task ID
   * @param user - Current authenticated user
   * @returns Task document
   */
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.tasksService.findOne(id, user.userId);
  }

  /**
   * Update a task
   * PATCH /tasks/:id
   * @param id - Task ID
   * @param updateTaskDto - Fields to update
   * @param user - Current authenticated user
   * @returns Updated task
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: any,
  ) {
    return this.tasksService.update(id, updateTaskDto, user.userId);
  }

  /**
   * Delete a task
   * DELETE /tasks/:id
   * @param id - Task ID
   * @param user - Current authenticated user
   * @returns Deleted task
   */
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.tasksService.remove(id, user.userId);
  }
}
