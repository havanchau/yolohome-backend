import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { User } from 'src/schemas/users/users.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) { }

  async createMessage(message: Message): Promise<Message> {
    const createdMessage = new this.messageModel(message);
    return createdMessage.save();
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async getMessagesBetweenUsers(userId1: string, userId2: string): Promise<Message[]> {
    return this.messageModel.find({
      $or: [
        { userIdSent: userId1, userIdReceived: userId2 },
        { userIdSent: userId2, userIdReceived: userId1 },
      ],
    }).exec();
  }

}
