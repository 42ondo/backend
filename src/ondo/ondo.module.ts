import { Module } from '@nestjs/common';
import { EvalRepository } from 'src/eval/eval.repository';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { UserRepository } from '../user/user.repository';
import { OndoController } from './ondo.controller';
import { OndoService } from './ondo.service';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([UserRepository]),
	],
  controllers: [OndoController],
  providers: [OndoService]
})
export class OndoModule {}
