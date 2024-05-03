import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceCustomer, DeviceCustomerSchema } from './customer.device.schema';
import { DeviceCustomersService } from './customer.device.service';
import { DeviceCustomerController } from './customer.device.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DeviceCustomer.name, schema: DeviceCustomerSchema }]),
  ],
  controllers: [DeviceCustomerController],
  providers: [DeviceCustomersService],
})
export class DeviceCustomersModule {}