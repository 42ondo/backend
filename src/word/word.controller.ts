import { Controller, Get, Param, Query } from '@nestjs/common';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get('/rank')
  async getWordRanking(@Query('count') count: number) {
    const words = await this.wordService.getWordRanking(count);
    return { words };
  }

  @Get('/rank/:id')
  async getUserWordRanking(@Param('string') userName: string) {
    return await this.wordService.getUserWordRanking(userName);
  }
}
