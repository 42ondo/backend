import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvalService } from './eval.service';
import { EvalController } from './eval.controller';
import { EvalEntity } from './eval.entity';
import { EvalRepository } from './eval.repository';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';

@Module({
  imports: [
		TypeOrmExModule.forCustomRepository([EvalRepository]),
		
	],
  controllers: [EvalController],
  providers: [EvalService]
})
export class EvalModule {}
