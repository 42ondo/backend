import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordEntity } from './word.entity';
import { WordRepository } from './word.repository';
import { MecabAsync } from 'mecab-async'
import { Mecab }from 'mecab-ya'
import { parse } from 'path';
import { first } from 'rxjs';

type DataType = {
	index: number,
	id: number
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
	evalId: number;
}

let mecab = require('mecab-ya')
@Injectable()
export class WordService {

	constructor (
		@InjectRepository(WordRepository)
		private wordRepository: WordRepository
	) {}

	async createWordData(datas: DataType[]): Promise<void> {
		const comments = await Promise.all(datas.map(async (item) => {
			const { comment, id: evalId } = item;
			return { comment, evalId };
		}));
		const words = await parseWord(comments);
		this.wordRepository.createWordData(words);
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
					return { word: item2[0], evalId: item.evalId };
				});
				words.push(...firstFields); // push the resulting array into the `words` array
				resolve();
			});
		});
	}));
	return words;
}
