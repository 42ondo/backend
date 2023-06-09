import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { WordEntity } from './word.entity';

const blackList: string[] = [
  'word',
  '텐데',
  'pdf',
  'OK',
  'ok',
  'ex',
  'ft',
  '평가',
  '설명',
  '수',
  '과제',
  '것',
  '진행',
  '코드',
  '점',
  '함수',
  '이해',
  '고생',
  '문제',
  '구현',
  '확인',
  'cpp',
  '감사',
  '분',
  '사용',
  '수',
  '평',
  '개',
  '데',
  '내용',
  '수고',
  '부분',
  '해당',
  '지식',
  '중',
  '때',
  '도움',
  '처음',
  '동작',
  '갯',
  '필요',
  '실행',
  '오랜만',
  '이야기',
  '자분',
  '처리',
  'libft',
  '작성',
  '거',
  '질문',
  '가변',
  '관련',
  '번',
  '전체',
  '과정',
  '통과',
  '변수',
  '안녕',
  '게',
  '친절',
  '지향',
  'c',
  '가지',
  '자',
  'push',
  '활용',
  '프로그램',
];

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
    let ret = [];
    while (ret.length < rank) {
      let x = result.shift();
      // console.log('xword : ', x.word);
      if (x.word.length < 2) continue;
      if (!blackList.includes(x.word))
        ret.push({ id: ret.length + 1, word: x.word, count: x.count });
    }
    // console.log('ret : ', ret);
    return ret;
  }

  async getUserWordRanking(
    user_id: number,
  ): Promise<{ word: string; count: number }[]> {
    const result = await this.createQueryBuilder('word_entity')
      .select('word_entity.word as word, COUNT(*) as count')
      .where('word_entity.user_id = :user_id', { user_id })
      .groupBy('word_entity.word')
      .orderBy('count', 'DESC')
      .getRawMany();

    let ret = [];
    while (ret.length < 10 && result.length > 0) {
      let x = result.shift();
      // console.log('xword : ', x.word);
      if (x.word.length < 2) continue;
      if (!blackList.includes(x.word))
        ret.push({ id: ret.length + 1, word: x.word, count: x.count });
    }
    // console.log('ret : ', ret);
    return ret;
  }
}
