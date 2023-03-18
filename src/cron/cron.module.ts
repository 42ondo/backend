import { Injectable, Logger, Module } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiModule } from 'src/api/api.module';
import { EvalModule } from 'src/eval/eval.module';
import { StatModule } from 'src/stat/stat.module';
import { UserModule } from 'src/user/user.module';
import { WordModule } from 'src/word/word.module';
import { CronService } from './cron.service';

@Module({
  imports: [ApiModule, 
			EvalModule,
      UserModule,
      StatModule,
      WordModule,],
  providers: [CronService],
})
export class CronModule {}
