import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * Task schema for MongoDB
 * Stores individual task data linked to a user
 */
@Schema()
export class Task extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ default: false })
  completed!: boolean;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId!: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
