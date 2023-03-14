import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { EvalRepository } from './eval.repository';
import { EvalEntity } from './eval.entity';

@Injectable()
export class EvalService {

	constructor (
		@InjectRepository(EvalRepository)
		private evalRepository: EvalRepository
	) {}

	//create_data(evaluator: string): Promise <EvalEntity> {
	//	return (this.evalRepository.create_data(evaluator));
	//}
	async create_data(): Promise <EvalEntity> {
		return (await this.evalRepository.create_data());
	}
}
