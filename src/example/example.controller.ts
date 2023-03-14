import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(private exampleService: ExampleService) {}

  @Get('/')
  printFeedback() {
    this.exampleService.print();
  }
}