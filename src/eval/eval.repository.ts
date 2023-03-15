import { Repository } from "typeorm";
import { EvalEntity } from "./eval.entity";
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { EvalDtoType } from "./eval.dto";

@CustomRepository(EvalEntity)
export class EvalRepository extends Repository<EvalEntity> {

	async create_data(evalData: EvalDtoType[]): Promise<EvalEntity[]> {
		const data = this.create(evalData);

		await this.save(data);
		return (data);
	}
}
