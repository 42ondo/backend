import { Get, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiService } from 'src/api/api.service';
import { EvalService } from 'src/eval/eval.service';

@Injectable()
export class CronService {
//  private readonly logger = new Logger(CronService.name);
  constructor (
		private apiService:ApiService,
    private evalService:EvalService,
    ) {}

  @Cron('*/10 * * * * *')
  async handleCron(){
	const data = await this.apiService.getFeedbacks();
	this.evalService.createEvalData(data);
  }
}
