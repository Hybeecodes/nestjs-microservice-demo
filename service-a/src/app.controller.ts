import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'get-random-user' })
  async getRandomUser() {
    console.log('hello');
    return [
      {
        id: 1,
        firstName: 'john',
        lastName: 'doe',
      },
    ];
  }
}
