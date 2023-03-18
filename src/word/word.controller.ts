import { Controller, Get, Param, Query } from '@nestjs/common';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
	constructor (private wordService: WordService) {}

	@Get('/rank')
	async getWordRanking (@Query('rank') rank: number) {
		return await this.wordService.getWordRanking(rank);
	}

	@Get('/rank/:id')
	async getUserWordRanking (@Param('id') userId: number) {
		return await this.wordService.getUserWordRanking(userId);
	}
}
