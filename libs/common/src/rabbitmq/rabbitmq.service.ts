import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transport,RmqOptions } from "@nestjs/microservices";

@Injectable()
export class RabbitMQService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  private getAmqpUrl(): string {
  const host = this.configService.get<string>('rabbitmq.host');
  const port = this.configService.get<number>('rabbitmq.port');
  const username = this.configService.get<string>('rabbitmq.username');
  const password = this.configService.get<string>('rabbitmq.password');

  return `amqp://${username}:${password}@${host}:${port}`;
}

private buildOptions(queue: string): RmqOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [this.getAmqpUrl()],
      queue,
      queueOptions: {
        durable: true,
      },
    },
  };
}

createClientOptions(queue: string): RmqOptions {
  return this.buildOptions(queue);
}

createMicroserviceOptions(queue: string): RmqOptions {
  return this.buildOptions(queue);
}
}