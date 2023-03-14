import { EntityRepository, Repository } from "typeorm";
import { EvalEntity } from "./eval.entity";
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { EvalDtoType } from "./eval.dto";
@CustomRepository(EvalEntity)
export class EvalRepository extends Repository<EvalEntity> {

	//BoardRepository라는 이름을 가진 클래스 하나를 선언해서 Reposiroty로 생성하는데 -> 이때 다루는 entity는 <Board>다 라고 선언.
	//async create_data(evaluator: string): Promise <EvalEntity> {
	//const data = this.create({});

	//await this.save(data); // db에 저장.
	//return (data);
	//}
	async create_data(evalData: EvalDtoType[]): Promise<EvalEntity[]> {

		const data = this.create(evalData);

		await this.save(data); // db에 저장.
		return (data);
	}

}
