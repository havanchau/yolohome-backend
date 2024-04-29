import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Message } from './message.schema';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway'; // Import MessageGateway

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageGateway: MessageGateway,
  ) { }

  @Post()
  async create(@Body() message: Message): Promise<Message> {
    const createdMessage = await this.messageService.createMessage(message);

    // Gửi tin nhắn mới tới các client thông qua Gateway
    this.messageGateway.sendMessageToClient(createdMessage);

    return createdMessage;
  }

  @Get(':userIdSent/:userIdReceived')
  async getByUserIds(@Param('userIdSent') userIdSent: string, @Param('userIdReceived') userIdReceived: string): Promise<Message[]> {
    return this.messageService.getMessagesBetweenUsers(userIdSent, userIdReceived);
  }
}
