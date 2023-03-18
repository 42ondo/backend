import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { StatController } from './stat.controller';
import { StatRepository } from './stat.repository';
import { StatService } from './stat.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([StatRepository]),
  ],
  controllers: [StatController],
  providers: [StatService],
  exports: [StatService],
})
export class StatModule {}
