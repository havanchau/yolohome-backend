import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'email' })
  @Prop({ required: true, unique: true })
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'fullname' })
  @Prop()
  fullname: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'username' })
  @Prop()
  username: string;

  @ApiProperty({ type: Date, description: 'createdAt' })
  @Prop()
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'completedAt' })
  @Prop()
  completedAt?: Date;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'password' })
  @Exclude()
  @Prop({ required: true, unique: true })
  password: string;

  @IsString()
  @ApiProperty({ type: String, description: 'role' })
  @Prop({ required: true })
  role: string;

  @IsString()
  @ApiProperty({ type: String, description: 'homeId' })
  @Prop({ required: true })
  homeId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'homePassword' })
  @Prop({ required: true })
  homePassword: string;

}

export const UserSchema = SchemaFactory.createForClass(User);