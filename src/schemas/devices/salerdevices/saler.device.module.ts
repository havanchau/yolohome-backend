import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSaler, DeviceSalerSchema } from './saler.device.schema';
import { DeviceSalersService } from './saler.device.service';
import { DeviceSalerController } from './saler.device.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DeviceSaler.name, schema: DeviceSalerSchema }]),
  ],
  controllers: [DeviceSalerController],
  providers: [DeviceSalersService],
})
export class DeviceSalersModule {}