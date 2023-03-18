import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { WordEntity } from './word.entity';

type WordType = {
	id: number,
	word : string,
	count : number
}

@CustomRepository(WordEntity)
export class WordRepository extends Repository<WordEntity> {

	async createWordData(wordData: WordEntity[]): Promise<void> {
		const data = this.create(wordData);
		await this.save(data);
	}

	//	GROUP BY word
	async getWordRanking(rank: number): Promise<{ id: number; word: string; count: number }[]> {
		const query = `
		  SELECT word, COUNT(*) as count
		  FROM word_entity
		  GROUP BY word
		  ORDER BY count DESC
		`;
		const result = await this.query(query);
		return result.slice(0, 20).map(({ id, word, count }, i) => ({ id: i, word, count }));
	}
}
