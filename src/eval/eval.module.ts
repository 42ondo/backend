import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvalService } from './eval.service';
import { EvalController } from './eval.controller';
import { EvalEntity } from './eval.entity';
import { EvalRepository } from 'src/eval.repository';

@Module({
  imports: [
		TypeOrmModule.forFeature([EvalEntity]),
  		TypeOrmModule.forFeature([EvalRepository])
	],
  providers: [EvalService],
  controllers: [EvalController]
})
export class EvalModule {}
