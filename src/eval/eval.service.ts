import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvalRepository } from './eval.repository';
import { EvalEntity } from './eval.entity';

@Injectable()
export class EvalService {

	constructor(
		@InjectRepository(EvalRepository)
		private evalRepository: EvalRepository,
	) {}

  async createEvalData(evalData: EvalEntity[]): Promise<void> {
    try {
      await this.evalRepository.createEvalDatas(evalData);
    } catch (e) {
      console.log('eval serivce', e.message);
    }
  }


}

