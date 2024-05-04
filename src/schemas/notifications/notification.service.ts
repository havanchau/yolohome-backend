import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  private notificationGateway: NotificationGateway;
  constructor(private readonly httpService: HttpService
  ) {}

  setNotificationGateway(notificationGateway: NotificationGateway) {
    this.notificationGateway = notificationGateway;
  }

  async getAllNotifications(): Promise<any[]> {
    const feedNames = ['button1', 'button2', 'ai'];
    const notifications = [];

    for (const feedName of feedNames) {
      try {
        const response = await this.httpService
          .get(`https://io.adafruit.com/api/v2/thanhliemtala/feeds/${feedName}/data`)
          .toPromise();
        notifications.push(...response.data);
      } catch (error) {
        console.error(`Failed to fetch notifications for ${feedName}: ${error.message}`);
      }
    }

    return notifications;
  }

  async sendNotification(notification: any) {
    if (this.notificationGateway) {
      this.notificationGateway.sendNotification(notification);
    } else {
      throw new Error('NotificationGateway is not initialized');
    }
  }

  async getNotificationById(id: string): Promise<any> {
    const feedNames = ['button1', 'button2', 'ai'];
    const notifications = [];
    
    for (const feedName of feedNames) {
      try {
        const response = await this.httpService
          .get(`https://io.adafruit.com/api/v2/thanhliemtala/feeds/${feedName}/data/${id}`)
          .toPromise();
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch notification');
      }
    }
    return notifications;
  }

  async getActiveTime(feedName: string): Promise<number> {
    try {
      const response = await this.httpService
        .get(`https://io.adafruit.com/api/v2/thanhliemtala/feeds/${feedName}/data`)
        .toPromise();
      
      const data = response.data;
      let activeTime = 0;
      let lastActiveTimestamp: Date = null;

      for (let i = data.length-1; i >=0; i--) {
        const timestamp = new Date(data[i].created_at);
        const value = data[i].value;

        if (value === '1' || value === '2' || value === '3') {
          lastActiveTimestamp = timestamp;
        } else if (value === '0' && lastActiveTimestamp) {
          activeTime += timestamp.getTime() - lastActiveTimestamp.getTime();
          lastActiveTimestamp = null;
        }
      }

      // Convert activeTime to hours
      const activeTimeHours = activeTime / (3600 * 1000); // 3600 seconds in an hour

      return activeTimeHours;
    } catch (error) {
      throw new Error('Failed to fetch data from Adafruit IO');
    }
  }
}

