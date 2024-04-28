import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './schemas/users/users.module';
import { MessagesModule } from './schemas/messages/message/message.module';
import { DeviceSalersModule } from './schemas/devices/salerdevices/saler.device.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    MessagesModule,
    DeviceSalersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}