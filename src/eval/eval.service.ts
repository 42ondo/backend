import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvalRepository } from './eval.repository';
import { EvalEntity } from './eval.entity';
import { StatEntity } from 'src/stat/stat.entity';
import { StatService } from 'src/stat/stat.service';
import { UserEntity } from 'src/user/user.entity';
import { time } from 'console';
import { fileURLToPath } from 'url';
import { Between } from 'typeorm';
import { ApiService } from 'src/api/api.service';
import { filter } from 'rxjs';
import { WordList as wordList } from "src/algorithm/algorithm.wordlist"
import { UserRepository } from 'src/user/user.repository';

class Result {
  evalCnt: number;
  evalRatio: number;
  timeSpentAll : number;
  timeZoneLike : number;
  mostSubject : string;
}

@Injectable()
export class EvalService {
  constructor(
    @InjectRepository(EvalRepository)
    private evalRepository: EvalRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private statService: StatService,
    private apiService: ApiService,
  ) {}

  async createEvalData(evalData: EvalEntity[]): Promise<void> {
    try {
      await this.evalRepository.createEvalDatas(evalData);
    } catch (e) {
      console.log('eval serivce', e.message);
    }
  }

  async createStatData(): Promise<StatEntity> {

    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const data = await this.evalRepository
      .createQueryBuilder("eval_entity")
      .select("eval_entity.from")
      .addSelect("COUNT(eval_entity.from)", "count")
      .where("eval_entity.beginAt >= :start AND eval_entity.beginAt <= :end", {
          start: weekAgo,
          end: today,
      })
      .groupBy("eval_entity.from")
      .having("COUNT(eval_entity.from) > :count", { count: 0 })
      .getRawMany();

      const found = await this.evalRepository.find({
        where: {
          beginAt: Between(
            weekAgo.toISOString(),
            today.toISOString()
            )
        },
      });
		let i = -1;
		var timeSpent = 0;
		const evalTimeCnt = [];
  
		while (found[++i])
		{
		  const beginAt = new Date(found[i].beginAt);
		  const filledAt = new Date(found[i].filledAt);
		  evalTimeCnt.push(filledAt.getHours()); 
		  var elapsedMSec = filledAt.getTime() - beginAt.getTime(); 
		  var elapsedMin = elapsedMSec / 1000 / 60; 
		  timeSpent += elapsedMin;
		}
		const elementCount = evalTimeCnt.reduce((count, num) => {
			count[num] = (count[num] || 0) + 1;
			return count;
		  }, {});
		  const maxCount = Math.max.apply(null, Object.values(elementCount));
		  const mostFrequentElements = Object.keys(elementCount)
		  .filter((key) => elementCount[key] === maxCount)
		  .map((key) => Number(key));

		  const mostSubject = await this.evalRepository
		  .createQueryBuilder("eval_entity")
		  .select("eval_entity.projectId")
		  .addSelect("COUNT(eval_entity.projectId)", "count")
		  .groupBy("eval_entity.projectId")
		  .orderBy("count", "DESC")
		  .getRawOne()
  
      let statEntitiy = new StatEntity;
      const sum = data.reduce((acc, cur) => acc + Number(cur.count), 0);
      const avg = sum / data.length;
      statEntitiy.evalCnt = avg;
      statEntitiy.timeSpentAll = timeSpent / data.length;
      statEntitiy.timeZoneLike = mostFrequentElements.pop();
      statEntitiy.mostSubject = mostSubject.eval_entity_projectId;

      return (statEntitiy);
  }

  async getEvalDetail(id: number): Promise<any> {

    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const frequencyResult = await this.evalRepository
      .createQueryBuilder("eval_entity")
      .select("eval_entity.from")
      .addSelect("COUNT(eval_entity.from)", "count")
      .where("eval_entity.beginAt >= :start AND eval_entity.beginAt <= :end", {
          start: weekAgo,
          end: today,
      })
      .groupBy("eval_entity.from")
      .having("COUNT(eval_entity.from) > :count", { count: 0 })
      .getRawMany();

      const targetVal = id;
      const sortedArr = frequencyResult.sort((a, b) => b.count - a.count);
      let rank = sortedArr.findIndex(obj => obj.eval_entity_from === targetVal) ;
      console.log(rank);
      if (rank < 0)
        return (undefined);
      const percentile = (rank / frequencyResult.length) * 100;
    
      const mostSubject = await this.evalRepository
      .createQueryBuilder("eval_entity")
      .select("eval_entity.projectId")
      .where("eval_entity.from = :id", { id })
      .addSelect("COUNT(eval_entity.projectId)", "count")
      .groupBy("eval_entity.projectId")
      .orderBy("count", "DESC")
      .getRawMany();

      const found = await this.evalRepository.find(
        { where: {
          from: id,
          beginAt: Between(weekAgo.toISOString(), today.toISOString()),
        }
      });
      let i = -1;
      var timeSpent = 0;
      const evalTimeCnt = [];
      while (found[++i])
      {
        const beginAt = new Date(found[i].beginAt);
        const filledAt = new Date(found[i].filledAt);
        evalTimeCnt.push(filledAt.getHours());
        var elapsedMSec = filledAt.getTime() - beginAt.getTime(); 
        var elapsedMin = elapsedMSec / 1000 / 60; 
        timeSpent += elapsedMin;
      }
      const elementCount = evalTimeCnt.reduce((count, num) => {
      count[num] = (count[num] || 0) + 1;
      return count;
    }, {});

    const maxCount = Math.max.apply(null, Object.values(elementCount));
    const mostFrequentElements = Object.keys(elementCount)
    .filter((key) => elementCount[key] === maxCount)
    .map((key) => Number(key));

    ///subject_id를 subject name으로 바꿔주는 코드.
    let subjectName: string;
    let flag = 0;
    for (const [key, value] of Object.entries(wordList) ) {
			if (value.project_id == mostSubject[0].eval_entity_projectId) {
        flag = 1;
				subjectName = key;
        break ;
  		}
    }
    if (flag == 0) {
      subjectName = "🏊"
    }
    ///subject_id를 subject name으로 바꿔주는 코드.
    
    let result = new Result();
    result.evalCnt = found.length;
    result.evalRatio = percentile;
    result.timeSpentAll = timeSpent;
    result.timeZoneLike = mostFrequentElements.pop();
    result.mostSubject = subjectName;
    return  result;
  }

  async get42EvalData(page: number, date: Date): Promise<any> {
    const today = new Date();
    return await this.apiService.getApi(
      '/scale_teams',
      {
        'range[created_at]': `${date.toISOString()},${today.toISOString()}`, // 2000개 넘음...ㅠ
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

  async getEvalRank(cnt: number): Promise<any> {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const data = await this.evalRepository
      .createQueryBuilder("eval_entity")
      .select("eval_entity.from")
      .addSelect("COUNT(eval_entity.from)", "count")
      .where("eval_entity.beginAt >= :start AND eval_entity.beginAt <= :end", {
          start: weekAgo,
          end: today,
      })
      .groupBy("eval_entity.from")
      .having("COUNT(eval_entity.from) > :count", { count: 0 })
      .getRawMany();

      const userRepo = await this.userRepository.find();
      const sortedArr = data.slice().sort((a, b) => b.count - a.count);
      const rank = sortedArr.slice(0, Math.min(cnt, sortedArr.length));
      for (const item of rank) {
        const filteredUser = userRepo.filter(item2 => item2.id === item.eval_entity_from);
        if (filteredUser.length == 0) {
          throw new Error(`rank not found`);
        }
        if (item.eval_entity_from === filteredUser[0].id) {
          item.eval_entity_from = filteredUser[0].login;
        }
      }
      return (rank);
  }
}
