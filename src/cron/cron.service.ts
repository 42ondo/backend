import { Get, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiService } from 'src/api/api.service';
import { EvalService } from 'src/eval/eval.service';
import { StatService } from 'src/stat/stat.service';
import { UserService } from 'src/user/user.service';
import { WordService } from 'src/word/word.service';

@Injectable()
export class CronService {
  //  private readonly logger = new Logger(CronService.name);
  constructor(
    private apiService: ApiService,
    private evalService: EvalService,
    private userService: UserService,
    private wordService: WordService,
    private statService: StatService,
  ) {}

    @Cron('0 0 * * * *')
    // @Get()
    async handleCron() {
      // 자정마다 실행, 1. scaleTeam 정보 받아서 가공하기 2. eval DB에 넣기 3. user DB에 넣고 4. 기타등등
      const date = new Date(Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
      ));
    const yesterDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 1, 0, 0, 0));
    const data = await this.evalService.get42EvalData(1, yesterDay);
    await this.evalService.createEvalData(data);
    await this.userService.createUserData(data.map((item) => item.corrector));
	  await this.wordService.createWordData(data);
    await this.statService.createStatData(await this.evalService.createStatData());
    }
}
