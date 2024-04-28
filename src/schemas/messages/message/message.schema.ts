import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Message {

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'userIdSent' })
  @Prop({ required: true })
  userIdSent: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'userIdReceived' })
  @Prop({ required: true })
  userIdReceived: string;

  @ApiProperty({ type: Date, description: 'timeSent' })
  @Prop({ default: Date.now })
  timeSent: Date;

  @IsString()
  @MinLength(1)
  @ApiProperty({ type: String, description: 'content' })
  @Prop({ required: true })
  content: string;

  @ApiProperty({ type: Date, description: 'createdAt' })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'completedAt' })
  @Prop()
  completedAt?: Date;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
