import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {


    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'name' })
    @Prop({ required: true, unique: true })
    name: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'content' })
    @Prop()
    content: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'image' })
    @Exclude()
    @Prop({ required: true, unique: true })
    image: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'describe' })
    @Exclude()
    @Prop({ required: true, unique: true })
    describe: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'type' })
    @Exclude()
    @Prop({ required: true, unique: true })
    type: string;

}

export const DeviceSchema = SchemaFactory.createForClass(Device);
