import { EntityRepository, Repository } from "typeorm";
import { EvalEntity } from "./eval/eval.entity";

@EntityRepository(EvalEntity)
export class EvalRepository extends Repository<EvalEntity> {

}
