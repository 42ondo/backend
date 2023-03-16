import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { WordEntity } from './word.entity';

@CustomRepository(WordEntity)
export class WordRepository extends Repository<WordEntity> {
  async createWordData(wordData: WordEntity[]): Promise<void> {
    const data = this.create(wordData);

    await this.save(data);
  }
}
