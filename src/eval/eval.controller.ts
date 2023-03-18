import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiService } from 'src/api/api.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { StatEntity } from 'src/stat/stat.entity';
import { StatService } from 'src/stat/stat.service';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { WordEntity } from 'src/word/word.entity';
import { WordService } from 'src/word/word.service';
import { EvalEntity } from './eval.entity';
import { EvalService } from './eval.service';

@Controller('eval')
export class EvalController {
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private evalService: EvalService,
    private statService: StatService,
	private wordService: WordService,
  ) {}

  @Get()
  async initialize() {
    let data: any[] = ['start'];
    // let i = 1;
    // while (data.length > 0) {
      data = await this.get42EvalData(1);
      await this.evalService.createEvalData(data);
      await this.userService.createUserData(data.map((item) => item.corrector));
	  await this.wordService.createWordData(data);
    await this.statService.createStatData(await this.evalService.createStatData());
    }
    //}

  
  @Get('/average')
  async getEvalStat() :Promise<StatEntity> {
		console.log("test");
    const statData = await this.statService.getStatData();
		console.log(statData);
    return (statData);
  }

  private async get42EvalData(page: number): Promise<any> {
    const today = new Date();
    return await this.apiService.getApi(
      '/scale_teams',
      {
        'range[created_at]': `2022-01-01T00:00:00.000Z,${today.toISOString()}`, // 2000개 넘음...ㅠ
        // 'range[created_at]': `2022-03-02T00:00:00.000Z,2022-03-03T00:00:00.000Z`, // 평가가 별로 없었던 날짜 61개 data 받을 수 있음
        'filter[campus_id]': 29,
        page: page,
      },
      (response) => {
        return response.data
          .filter((item) => item.flag.positive === true && item.final_mark > 0)
          .map((item) => {
            const {
              id,
              flag,
              begin_at,
              filled_at,
              team: { project_id },
              comment,
              corrector: { id: userId, login, url },
              scale: { duration },
            } = item;
            return {
              id,
              beginAt: begin_at,
              filledAt: filled_at,
              projectId: project_id,
              comment,
              corrector: { id: userId, login, imgUrl: url },
              from: userId,
              duration,
              isOutStanding: flag.id === 9,
            };
          });
      },
    );
  }

  @Get('/:name')
  async getEvalDetail(@Param('name') name: string ) :Promise<string> {
    const idbyname = await this.userService.getIdByName(name);
    return (this.evalService.getEvalDetail(idbyname));
  }
}
