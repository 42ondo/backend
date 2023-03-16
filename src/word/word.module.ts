import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { WordController } from './word.controller';
import { WordRepository } from './word.repository';
import { WordService } from './word.service';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([WordRepository]),
	],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService]
})
export class WordModule {}
