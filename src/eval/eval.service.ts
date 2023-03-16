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

	async createEvalData(evalDataDtos: EvalDtoType[]): Promise <void> {
		console.log(evalDataDtos.flag)
		// const evalEntitys = evalDataDtos.map(({id, comment, begin_at, filled_at,project_id, corrector, duration,flags }) => {

			// const isOut = flags.filter(x=>x.id===9)[0].positive === true ? true: false || false
			// return {id, comment, beginAt:begin_at, filledAt:filled_at, projectId:project_id,from:corrector.id, duration, isOutStanding:isOut};
		// })
		// console.log(evalEntitys);
		// console.dir(evalDataDtos.map(i => i.flags.filter(i => i.id === 9)));

			// await this.evalRepository.createEvalData(evalData);
	}
}


/*

return {id, comment, beginAt:begin_at, filledAt:filled_at, projectId:project_id,from:corrector.id, duration, 
	isOutStanding:flags.filter(i => i.id === 9)[0].positive === falle ? false : true


*/
