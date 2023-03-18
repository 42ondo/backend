import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvalRepository } from 'src/eval/eval.repository';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from '../user/user.repository';

class Ondo {
	ondo : number
};

@Injectable()
export class OndoService {

	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
	  ) {}

	//async getOndoRank (count: number): Promise<user[]> {
	//	//return await this.evalRepository.getOndoRank();
	//}

	async getOndoAverage (): Promise<Ondo> {
		const result = await this.userRepository
		.createQueryBuilder()
		.select('AVG(ondo)', 'average')
		.getRawOne();
		console.log(result);
		let ondo = new Ondo();
		ondo.ondo = result.average;
	  return ondo;
	}
}
