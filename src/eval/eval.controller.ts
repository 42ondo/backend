import { Body, Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
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
    // let data: any[] = ['start'];
    // let i = 1;
    // while (i < 10) {
    //   const date = new Date(Date.UTC(2022, 1, 1, 0, 0));
    //   data = await this.evalService.get42EvalData(i, date);
    //   await this.evalService.createEvalData(data);
      // await this.userService.createUserData(data.map((item) => item.corrector));
	    // await this.wordService.createWordFromDB();
          // await this.userService.resetUserOndo();
      await this.algoService.applyAlgoToUser();
    //   i++;
    // }
    await this.statService.createStatData(await this.evalService.createStatData());
  }
  
  @Get('/average')
  async getEvalStat() :Promise<any> {

    const statData = await this.statService.getStatData();

    ///subject_id를 subject name으로 바꿔주는 코드.

    let subjectName: string;
    for (const [key, value] of Object.entries(wordList) ) {
			if (value.project_id === statData.mostSubject) {
				subjectName = key
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

  @Get('/rank')
  async getEvalRank(@Query('count') count: number) :Promise<any>{
    console.log(count);
    const evals : any[] = await this.evalService.getEvalRank(count)
    return {evals: evals.map(item => {return  {userName: item.eval_entity_from, count: item.count}})};
  }

  @Get('/:name')
  async getEvalDetail(@Param('name') name: string ) :Promise<string> {
    const idbyname = await this.userService.getIdByName(name);
    const ret = await this.evalService.getEvalDetail(idbyname);
    if (ret == undefined || ret == null)
        throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    return (ret);
  }
}

