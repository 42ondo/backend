import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { AlgorithmService } from './algorithm.service';
import { EvalRepository } from 'src/eval/eval.repository';
import { UserRepository } from 'src/user/user.repository';
import { WordRepository } from 'src/word/word.repository';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([WordRepository, UserRepository, EvalRepository]),
    ],
  providers: [AlgorithmService],
  exports: [AlgorithmService]
})
export class AlgorithmModule {}

