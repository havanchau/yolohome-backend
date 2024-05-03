import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceSaler, DeviceSalerDocument } from './saler.device.schema';
import { Model } from 'mongoose';
import { CreateDeviceSalerDto } from './dto/create-saler.device.dto';
import { UpdateDeviceSalerDto } from './dto/update-saler.device.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DeviceSalersService {
    constructor(
        @InjectModel(DeviceSaler.name) private readonly deviceSalerModel: Model<DeviceSalerDocument>,
    ) { }

    async findAll(): Promise<DeviceSaler[]> {
        return this.deviceSalerModel.find({}).exec();
    }

    async create(createDeviceSalerDto: CreateDeviceSalerDto): Promise<DeviceSaler> {
        const createdDeviceSaler = new this.deviceSalerModel({
            ...createDeviceSalerDto,
            createdAt: new Date(),
        });
        return await createdDeviceSaler.save();
    }

    async findById(id: string): Promise<DeviceSaler> {
        const deviceSaler = await this.deviceSalerModel.findById(id).exec();
        if (!deviceSaler) {
            throw new NotFoundException('Not found');
        }
        return deviceSaler;
    }

    async update(id: string, dpdateDeviceSalerDto: UpdateDeviceSalerDto): Promise<DeviceSaler> {
        //
        return null;
    }

    async delete(id: string): Promise<DeviceSaler> {
        const deletedDeviceSaler = await this.deviceSalerModel.findByIdAndDelete(id).exec();
        if (!deletedDeviceSaler) {
            throw new NotFoundException('Not found');
        }
        return deletedDeviceSaler;
    }

    async findByName(name: string): Promise<DeviceSaler[]> {
        if (!name) {
            return [];
        }

        const regex = new RegExp(name, 'i');

        return this.deviceSalerModel.find({
            $or: [
                { name: { $regex: regex } }
            ]
        }).exec();

    }
}