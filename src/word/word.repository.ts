import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { WordEntity } from './word.entity';

type WordType = {
  id: number;
  word: string;
  count: number;
};

@CustomRepository(WordEntity)
export class WordRepository extends Repository<WordEntity> {
  async createWordData(wordData: WordEntity[]): Promise<void> {
    await this.save(wordData);
  }

  //	GROUP BY word
  async getWordRanking(
    rank: number,
  ): Promise<{ id: number; word: string; count: number }[]> {
    const query = `
			SELECT word, COUNT(*) as count
			FROM word_entity
			GROUP BY word
			ORDER BY count DESC
		`;
    const result = await this.query(query);
    return result
      .slice(0, rank)
      .map(({ id, word, count }, i) => ({ id: i, word, count }));
  }

  async getUserWordRanking(
    user_id: number,
  ): Promise<{ word: string; count: number }[]> {
    const topWords = await this.createQueryBuilder('word_entity')
      .select('word_entity.word, COUNT(*) as count')
      .where('word_entity.user_id = :user_id', { user_id })
      .groupBy('word_entity.word')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();
    return topWords.map((result) => ({
      word: result.word,
      count: result.count,
    }));
  }
}
