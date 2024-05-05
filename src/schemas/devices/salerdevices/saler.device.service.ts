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
        return this.deviceSalerModel.find({}).exec() || [];
    }

    async create(createDeviceSalerDto: CreateDeviceSalerDto): Promise<DeviceSaler> {
        try {
            const createdDeviceSaler = new this.deviceSalerModel(createDeviceSalerDto);
            return await createdDeviceSaler.save();
        } catch (error) {
            throw new Error('Could not create device saler' + error);
        }
    }


    async findById(id: string): Promise<DeviceSaler> {
        const deviceSaler = await this.deviceSalerModel.findById(id).exec();
        if (!deviceSaler) {
            throw new NotFoundException('Not found');
        }
        return deviceSaler;
    }

    async update(id: string, updateDeviceSalerDto: UpdateDeviceSalerDto): Promise<DeviceSaler> {
        try {
            const updatedDeviceSaler = await this.deviceSalerModel.findByIdAndUpdate(id, updateDeviceSalerDto, { new: true }).exec();
            
            if (!updatedDeviceSaler) {
                throw new NotFoundException('Device saler not found');
            }
    
            return updatedDeviceSaler;
        } catch (error) {
            throw new Error('Could not update device saler');
        }
    }

    async delete(id: string): Promise<DeviceSaler> {
        const deletedDeviceSaler = await this.deviceSalerModel.findByIdAndDelete(id).exec();
        if (!deletedDeviceSaler) {
            throw new NotFoundException('Not found');
        }
        return deletedDeviceSaler;
    }

    async findByName(name: string, userId: string): Promise<DeviceSaler[]> {
        if (!name) {
            return [];
        }
    
        const regex = new RegExp(name, 'i');
    
        return this.deviceSalerModel.find({
            userId: userId,
            $or: [
                { name: { $regex: regex } }
            ]
        }).exec();
    }
    

    async getDeviceByUserId(userId: string): Promise<DeviceSaler[]> {
        try {
            const devices = await this.deviceSalerModel.find({ userId }).exec();
            return devices;
        } catch (error) {
            throw new Error('Could not fetch devices by user id');
        }
    }
}