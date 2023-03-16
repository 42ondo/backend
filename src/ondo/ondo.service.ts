import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvalRepository } from 'src/eval/eval.repository';
import { UserEntity } from 'src/user/user.entity';

type user = {
	id: number,
	name : string,
	imgUrl : string,
	ondo : number
}

@Injectable()
export class OndoService {

	constructor(
		@InjectRepository(EvalRepository)
		private evalRepository: EvalRepository,
	  ) {}

	//async getOndoRank (count: number): Promise<user[]> {
	//	//return await this.evalRepository.getOndoRank();
	//}

	//async getOndoAverage (): Promise<number> {
	//	//return await this.evalRepository.getOndoAverage();
	//}
}
