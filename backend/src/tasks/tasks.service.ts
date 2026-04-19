import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

/**
 * TasksService handles all task-related operations
 * Manages CRUD operations for tasks with user isolation
 */
@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  /**
   * Create a new task for the authenticated user
   * @param createTaskDto - Task data
   * @param userId - ID of the user creating the task
   * @returns Created task document
   */
  async create(createTaskDto: CreateTaskDto, userId: string) {
    const newTask = new this.taskModel({
      title: createTaskDto.title,
      userId: new Types.ObjectId(userId),
      completed: false,
    });

    return newTask.save();
  }

  /**
   * Get all tasks for the authenticated user
   * @param userId - ID of the user
   * @returns Array of user's tasks sorted by creation date (newest first)
   */
  async findAll(userId: string) {
    return this.taskModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Get a specific task by ID
   * Verifies ownership to prevent unauthorized access
   * @param id - Task ID
   * @param userId - ID of the user requesting the task
   * @returns Task document
   * @throws NotFoundException if task doesn't exist
   * @throws ForbiddenException if user doesn't own the task
   */
  async findOne(id: string, userId: string) {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Verify user owns this task
    if (task.userId.toString() !== userId) {
      throw new ForbiddenException('You can only access your own tasks');
    }

    return task;
  }

  /**
   * Update a task (title and/or completion status)
   * Only task owner can update
   * @param id - Task ID
   * @param updateTaskDto - Fields to update
   * @param userId - ID of the user updating the task
   * @returns Updated task document
   */
  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    const task = await this.findOne(id, userId);

    // Update allowed fields
    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.completed !== undefined) {
      task.completed = updateTaskDto.completed;
    }

    return task.save();
  }

  /**
   * Delete a task
   * Only task owner can delete
   * @param id - Task ID
   * @param userId - ID of the user deleting the task
   * @returns Deleted task document
   */
  async remove(id: string, userId: string) {
    const task = await this.findOne(id, userId);
    return this.taskModel.findByIdAndDelete(id);
  }
}
