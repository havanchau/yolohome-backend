import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, MinLength, IsNumber } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'name' })
    @Prop({ required: true })
    name: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'image' })
    @Exclude()
    @Prop({ required: true })
    image: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'describe' })
    @Exclude()
    @Prop({ required: true })
    describe: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'type' })
    @Exclude()
    @Prop({ required: true })
    type: string;

    @IsNumber()
    @ApiProperty({ type: Number, description: 'power' })
    @Exclude()
    @Prop({ required: true })
    power: number;

}

export const DeviceSchema = SchemaFactory.createForClass(Device);
