import { Controller, Get, Param, Query } from '@nestjs/common';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
	constructor (private wordService: WordService) {}

	@Get()
	async handler () {
		this.wordService.print()
	}

	@Get('/rank')
	async getWordRanking (@Query('rank') rank: number): Promise<{ id: number; word: string; count: number }[]> {
		return await this.wordService.getWordRanking(rank);
	}
}