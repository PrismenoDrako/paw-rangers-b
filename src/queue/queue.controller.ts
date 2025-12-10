import { Controller, Post } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue-test')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  async testJob() {
    return this.queueService.enqueueNotification({
      msg: 'Hola desde Nest!',
      timestamp: Date.now(),
    });
  }
}
