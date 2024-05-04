import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Device } from '../device.shema';

export type DeviceSalerDocument = HydratedDocument<DeviceSaler>;

@Schema()
export class DeviceSaler {


    @IsNumber()
    @ApiProperty({ type: Number, description: 'discount' })
    @Prop()
    discount: number;

    @IsNumber()
    @ApiProperty({ type: Number, description: 'price' })
    @Prop()
    price: number;

    @IsNumber()
    @ApiProperty({ type: Number, description: 'amount' })
    @Prop()
    amount: number;

    @IsString()
    @ApiProperty({ type: String, description: 'userId' })
    @Prop()
    userId: string;

    @IsObject()
    @ApiProperty({ type: Device, description: 'information' })
    @Prop({ type: Object })
    information: Device;

}

export const DeviceSalerSchema = SchemaFactory.createForClass(DeviceSaler);
