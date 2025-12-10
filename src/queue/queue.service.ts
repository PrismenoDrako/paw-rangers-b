import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('notifications')
    private readonly notificationsQueue: Queue,
  ) {}

  async enqueueNotification(data: any) {
    return this.notificationsQueue.add('send-notification', data, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 3000 },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
