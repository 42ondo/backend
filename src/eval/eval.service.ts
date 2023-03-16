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

	async createEvalData(evalDataDtos: EvalDtoType[]): Promise <any> {
		const evalDataList = [];

		for (const evalDatadDto of evalDataDtos) {
			const { id, comment, feedback, begin_at, filled_at, project_id } = evalDatadDto;

			const evalData = new EvalEntity();
			evalData.id = id;
			evalData.comment = comment;
			evalData.feedback = feedback;
			evalData.begin_at = begin_at;
			evalData.filled_at = filled_at;
			evalData.project_id = project_id;

			await this.evalRepository.createEvalData(evalData);
		}
		return evalDataDtos;
	}
}
