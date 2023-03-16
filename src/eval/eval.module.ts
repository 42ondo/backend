import { Module } from '@nestjs/common';
import { EvalService } from './eval.service';
import { EvalController } from './eval.controller';
import { EvalRepository } from './eval.repository';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { ApiModule } from 'src/api/api.module';

@Module({
  imports: [
		TypeOrmExModule.forCustomRepository([EvalRepository]),
		ApiModule,
	],
  controllers: [EvalController],
  providers: [EvalService],
  exports: [EvalService],
})
export class EvalModule {}
