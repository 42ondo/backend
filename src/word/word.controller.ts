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

  @Get('/rank/:name')
  async getUserWordRanking(@Param('name') userName: string) {
    const words = await this.wordService.getUserWordRanking(userName);
    return { words };
  }
}
