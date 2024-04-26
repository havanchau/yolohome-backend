import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'id' })
  @Prop()
  id: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'userIdSent' })
  @Prop({ required: true, unique: true })
  userIdSent: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'userIdReceived' })
  @Prop()
  userIdReceived: string;

  @ApiProperty({ type: Date, description: 'timeSent' })
  @Prop()
  timeSent: Date;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'content' })
  @Exclude()
  @Prop({ required: true, unique: true })
  content: string;

  @ApiProperty({ type: Date, description: 'createdAt' })
  @Prop()
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'completedAt' })
  @Prop()
  completedAt?: Date;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
