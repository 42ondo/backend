import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(private exampleService: ExampleService) {}

  @Get('/')
  printFeedback(): Promise<any> {
    return this.exampleService.print();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  testtoken(@Request() request) {
    const { user } = request;
    console.log('!!!', user.id, user.login);
    return 'ok';
  }
}
