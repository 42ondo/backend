import { Module } from '@nestjs/common';
import { ApiModule } from 'src/api/api.module';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

@Module({
  imports: [ApiModule], // have to import ApiModule
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
