import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import mongoose, { Document } from "mongoose";
import { Device, DeviceSchema } from '../device.shema';

export type DeviceSalerDocument = HydratedDocument<DeviceSaler>;

@Schema()
export class DeviceSaler {


    @IsNumber()
    @ApiProperty({ type: Number, description: 'discount' })
    discount: number;

    @IsNumber()
    @ApiProperty({ type: Number, description: 'price' })
    price: number;

    @IsNumber()
    @ApiProperty({ type: Number, description: 'amount' })
    amount: number;

    @IsString()
    @ApiProperty({ type: String, description: 'userId' })
    userId: string;

    @IsObject()
    @ApiProperty({ type: mongoose.Schema.Types.ObjectId, description:'information' })
    information: Device;
}

export const DeviceSalerSchema = SchemaFactory.createForClass(DeviceSaler);
