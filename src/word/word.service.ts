import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvalRepository } from 'src/eval/eval.repository';
import { UserRepository } from 'src/user/user.repository';
import { WordRepository } from './word.repository';

type DataType = {
	index: number,
	id: number,
	comment: string,
	from: number;
	beginAt: string
	filledAt: string;
	duration: number;
	isOutStanding: boolean;
	projectId: number
}

type CommentData = {
	comment: string
	eval_id: number;
	user_id: number;
	project_id: number;
}

let mecab = require('mecab-ya')
@Injectable()
export class WordService {

	constructor (
		@InjectRepository(WordRepository)
		private wordRepository: WordRepository,
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		@InjectRepository(EvalRepository)
		private evalRepository: EvalRepository,
	) {}

	async createWordData(datas: DataType[]): Promise<void> {
		const comments = await Promise.all(datas.map(async (item) => {
			return { 
				comment:item.comment, 
				eval_id: item.id, 
				user_id: item.from, 
				project_id: item.projectId };
		}));
		const words = await parseWord(comments)
		this.wordRepository.createWordData(words)
	}

	async getWordRanking(rank: number) {
		return await this.wordRepository.getWordRanking(rank);
	}

	async getUserWordRanking (userName: string) {
		const userInf = await this.userRepository.findOne({
			where: {
				login: userName
			}
		})
		return this.wordRepository.getUserWordRanking(userInf.id);
	}
}

async function parseWord(comments: CommentData[]): Promise<any> {
	const words = [];
	await Promise.all(comments.map((item) => {
		return new Promise<void>((resolve) => {
			mecab.pos(item.comment, (error, word) => {
				const data = word.filter((x) => {
					const head = x[1].substr(0, 2);
					if (head == "NN" || head == "SL") return true;
					return false;
				});
				const firstFields = data.map((item2) => {
					const { word, evalId } = item2;
					return { 
						word: item2[0], 
						eval_id: item.eval_id, 
						user_id: item.user_id, 
						project_id: item.project_id
					};
				});
				words.push(...firstFields); // push the resulting array into the `words` array
				resolve();
			});
		});
	}));
	return words;
}
