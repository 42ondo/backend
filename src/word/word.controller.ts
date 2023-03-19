import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get('/rank')
  @UseGuards(JwtAuthGuard)
  async getWordRanking(@Query('count') count: number) {
    const words = await this.wordService.getWordRanking(count);
    return { words };
  }

  @Get('/rank/:name')
  @UseGuards(JwtAuthGuard)
  async getUserWordRanking(@Param('name') userName: string) {
    const words = await this.wordService.getUserWordRanking(userName);
    return { words };
  }
}
