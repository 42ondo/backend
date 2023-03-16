import { Get, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { EvalRepository } from '../eval/eval.repository';
import { EvalEntity } from '../eval/eval.entity';
import { ApiService } from 'src/api/api.service';
import { EvalDtoType } from '../eval/eval.dto';
import { EvalService } from 'src/eval/eval.service';

@Injectable()
export class CronService {
//  private readonly logger = new Logger(CronService.name);
  constructor (
		private apiService:ApiService,
    private evalService:EvalService,
    ) {}

  @Cron('*/30 * * * * *')
  async handleCron(){
	const data = await this.apiService.getFeedbacks();
	this.evalService.create_data(data);
  }
}
