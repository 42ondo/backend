import { Module } from '@nestjs/common';
import { EvalRepository } from 'src/eval/eval.repository';
import { TypeOrmExModule } from '../typeorm-ex/typeorm-ex.module';
import { UserRepository } from '../user/user.repository';
import { WordController } from './word.controller';
import { WordRepository } from './word.repository';
import { WordService } from './word.service';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([WordRepository]),
		TypeOrmExModule.forCustomRepository([UserRepository]),
		// TypeOrmExModule.forCustomRepository([EvalRepository]),
	],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService]
})
export class WordModule {}
