import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSaler, DeviceSalerSchema } from './saler.device.schema';
import { DeviceSalersService } from './saler.device.service';
import { DeviceSalersController } from './saler.device.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DeviceSaler.name, schema: DeviceSalerSchema }]),
  ],
  controllers: [DeviceSalersController],
  providers: [DeviceSalersService],
})
export class DeviceSalersModule {}