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
      const date = new Date(2022, 1, 1, 0, 0);
      console.log("test 1 : ",date);
      data = await this.evalService.get42EvalData(1, date);
      await this.evalService.createEvalData(data);
      await this.userService.createUserData(data.map((item) => item.corrector));
	  await this.wordService.createWordData(data);
    await this.statService.createStatData(await this.evalService.createStatData());
    await this.evalService.setUsersOndo();
    }
    //}
    

  
  @Get('/average')
  async getEvalStat() :Promise<StatEntity> {
		console.log("test");
    const statData = await this.statService.getStatData();
		console.log(statData);
    return (statData);
  }
  
  @Get('/:name')
  async getEvalDetail(@Param('name') name: string ) :Promise<string> {
    const idbyname = await this.userService.getIdByName(name);
    return (this.evalService.getEvalDetail(idbyname));
  }
}
