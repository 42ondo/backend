import { Injectable, Logger, Module } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiModule } from 'src/api/api.module';
import { EvalModule } from 'src/eval/eval.module';
import { CronService } from './cron.service';

@Module({
  imports: [ApiModule, 
			EvalModule],
  providers: [CronService],
})
export class CronModule {}
