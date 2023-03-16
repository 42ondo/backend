import { Module } from '@nestjs/common';
import { EvalService } from './eval.service';
import { EvalRepository } from './eval.repository';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { ApiModule } from 'src/api/api.module';
import { EvalController } from './eval.controller';
import { UserModule } from 'src/user/user.module';
import { WordModule } from 'src/word/word.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([EvalRepository]),
    ApiModule,
    UserModule,
	WordModule,
  ],
  providers: [EvalService],
  exports: [EvalService],
  controllers: [EvalController],
})
export class EvalModule {}
