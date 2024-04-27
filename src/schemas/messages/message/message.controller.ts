import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Message } from './message.schema';
import { MessageService } from './message.service';
import { Socket } from 'socket.io';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() message: Message): Promise<Message> {
    const createdMessage = await this.messageService.createMessage(message);
    // You can emit the created message to the relevant users here using Socket.IO
    return createdMessage;
  }

  @Get()
  async getAll(): Promise<Message[]> {
    return this.messageService.getAllMessages();
  }

  @Get(':userId')
  async getByUserId(@Param('userId') userId: string): Promise<Message[]> {
    return this.messageService.getMessagesByUserId(userId);
  }
}