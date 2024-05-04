import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import mongoose, { Document } from "mongoose";
import { Device, DeviceSchema } from '../device.shema';

export type DeviceCustomerDocument = HydratedDocument<DeviceCustomer>;

@Schema()
export class DeviceCustomer {


    @IsString()
    @ApiProperty({ type: String, description: 'state' })
    state: string;

    @IsObject()
    @ApiProperty({ type: mongoose.Schema.Types.ObjectId, description:'information' })
    information: Device;
}

export const DeviceCustomerSchema = SchemaFactory.createForClass(DeviceCustomer);
