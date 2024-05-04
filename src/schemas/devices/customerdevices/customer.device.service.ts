import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceCustomer, DeviceCustomerDocument } from './customer.device.schema';
import { Model } from 'mongoose';
import { CreateDeviceCustomerDto } from './dto/create-customer.device.dto';
import { UpdateDeviceCustomerDto } from './dto/update-customer.device.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DeviceCustomersService {
    constructor(
        @InjectModel(DeviceCustomer.name) private readonly deviceCustomerDeviceCustomerModel: Model<DeviceCustomerDocument>,
    ) { }

}