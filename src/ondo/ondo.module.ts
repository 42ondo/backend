import { Module } from '@nestjs/common';
import { EvalRepository } from 'src/eval/eval.repository';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { OndoController } from './ondo.controller';
import { OndoService } from './ondo.service';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([EvalRepository]),
	],
  controllers: [OndoController],
  providers: [OndoService]
})
export class OndoModule {}
