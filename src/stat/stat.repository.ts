import { Repository } from 'typeorm';
import { StatEntity } from './stat.entity';
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';

@CustomRepository(StatEntity)
export class StatRepository extends Repository<StatEntity> {
  async createStatDatas(statData: StatEntity): Promise<StatEntity> {
    console.log(statData);
    const data = this.create(statData);

    await this.save(data);
    return data;
  }
}
