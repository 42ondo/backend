import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { EvalRepository } from './eval.repository';
import { EvalEntity } from './eval.entity';
import { ApiService } from 'src/api/api.service';
import { EvalDtoType } from './eval.dto';
@Injectable()
export class EvalService {

	constructor (
		@InjectRepository(EvalRepository)
		private evalRepository: EvalRepository,
		private apiService:ApiService,
	) {}

	async create_data(): Promise <any> {
		const data : EvalDtoType[] = await this.apiService.getFeedbacks();
		return await this.evalRepository.create_data(data);
	}
}
