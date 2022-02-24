import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SERVICE_A') private serviceAClient: ClientProxy,
    @Inject('SERVICE_B') private serviceBClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('get-users')
  async getUsers() {
    const users = await this.serviceAClient
      .send({ cmd: 'get-random-user' }, {})
      .toPromise();
    const count = await this.serviceBClient
      .send<number>({ cmd: 'get-user-count' }, {})
      .toPromise();
    return {
      count,
      users,
    };
  }
}
