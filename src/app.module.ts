import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as cors from 'cors';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors())
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
