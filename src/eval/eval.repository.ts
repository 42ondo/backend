import { Repository } from 'typeorm';
import { EvalEntity } from './eval.entity';
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';

@CustomRepository(EvalEntity)
export class EvalRepository extends Repository<EvalEntity> {
  async createEvalDatas(evalData: EvalEntity[]): Promise<EvalEntity[]> {
    const data = this.create(evalData);

    await this.save(data);
    return data;
  }
}
