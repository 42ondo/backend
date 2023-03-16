import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordEntity } from './word.entity';
import { WordRepository } from './word.repository';
//import { MecabAsync } from 'mecab-async'
//import {Mecab }from 'mecab-ya'
import { parse } from 'path';

let mecab = require('mecab-ya')
@Injectable()
export class WordService {

	constructor (
		@InjectRepository(WordRepository)
		private wordRepository: WordRepository
	) {}

	async createWordData(comments: string[]): Promise<void> {
		//comments.forEach(comment=>{
		//	const parsedWordDatas :WordEntity[]= parseWord(comment)
		//	this.wordRepository.createWordData(parsedWordDatas);
		//})
		parseWord()
	}
}

async function parseWord (): Promise<any>  {
	const text = "아버지 가방에 들어가신다."
	mecab.pos(text,(error,result)=>{
		console.log(result)
	})
}
