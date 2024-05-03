import { Controller, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getAllNotifications() {
    return this.notificationService.getAllNotifications();
  }

  @Get(':id')
  async getNotificationsById(@Param('id') id: string) {
    return this.notificationService.getNotificationById(id);
  }

  @Get('active-time/:feedName')
  async getActiveTime(@Param('feedName') feedName: string) {
    return this.notificationService.getActiveTime(feedName);
  }
}
