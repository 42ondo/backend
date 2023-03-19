import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiService } from 'src/api/api.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { StatEntity } from 'src/stat/stat.entity';
import { StatService } from 'src/stat/stat.service';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { WordEntity } from 'src/word/word.entity';
import { WordService } from 'src/word/word.service';
import { EvalService } from './eval.service';
import { AlgorithmService } from 'src/algorithm/algorithm.service';
import { WordList as wordList } from "src/algorithm/algorithm.wordlist"

@Controller('eval')
export class EvalController {
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private evalService: EvalService,
    private statService: StatService,
	private wordService: WordService,
  	private algoService: AlgorithmService,
  ) {}

  @Get()
  async initialize() {
    let data: any[] = ['start'];
    let i = 1;
    while (i < 100) {
      const date = new Date(Date.UTC(2022, 1, 1, 0, 0));
      data = await this.evalService.get42EvalData(i, date);
      await this.evalService.createEvalData(data);
      await this.userService.createUserData(data.map((item) => item.corrector));
	  await this.wordService.createWordData(data);
      await this.algoService.function(data);
      i++;
    }
    await this.statService.createStatData(await this.evalService.createStatData());
  }
  
  @Get('/average')
  async getEvalStat() :Promise<any> {

    const statData = await this.statService.getStatData();

    ///subject_id를 subject name으로 바꿔주는 코드.
    console.log("called")

    let subjectName: string;
    for (const [key, value] of Object.entries(wordList) ) {
      console.log("비교중", key,value,  value.project_id, statData.mostSubject)
			if (value.project_id === statData.mostSubject) {
				subjectName = key
        console.log("찾음", key, subjectName, value.project_id)
  	  }
    ///subject_id를 subject name으로 바꿔주는 코드.
  }

    return {
      index: statData.index,
      evalCnt: statData.evalCnt,
      timeSpentAll: statData.timeSpentAll,
      timeZoneLike: statData.timeZoneLike,
      mostSubject: subjectName
    };
  }

  @Get('/:rank')
  async getEvalRank(@Param('rank') rank: number) :Promise<any>{
    const evals : any[] = await this.evalService.getEvalRank(rank)
    return {evals: evals.map(item => {return  {userName: item.eval_entity_from, count: item.count}})};
  }

  @Get('/:name')
  async getEvalDetail(@Param('name') name: string ) :Promise<string> {
    const idbyname = await this.userService.getIdByName(name);
    return (this.evalService.getEvalDetail(idbyname));
  }


}
