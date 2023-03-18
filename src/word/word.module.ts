import { Module } from '@nestjs/common';
import { EvalRepository } from 'src/eval/eval.repository';
import { EvalService } from 'src/eval/eval.service';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { UserRepository } from 'src/user/user.repository';
import { WordController } from './word.controller';
import { WordRepository } from './word.repository';
import { WordService } from './word.service';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([WordRepository]),
		EvalService,
	],
  controllers: [WordController],
  providers: [WordService, EvalRepository, UserRepository],
  exports: [WordService]
})
export class WordModule {}
