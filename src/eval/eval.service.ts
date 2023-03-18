import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvalRepository } from './eval.repository';
import { EvalEntity } from './eval.entity';
import { UserEntity } from 'src/user/user.entity';
import { time } from 'console';
import { fileURLToPath } from 'url';

class Result {
  evalCnt: number;
  evalRatio: number;
  timeSpentAll : number;
  timeZoneLike : number;
  mostSubject : number;
}

@Injectable()
export class EvalService {
  constructor(
    @InjectRepository(EvalRepository)
    private evalRepository: EvalRepository,
  ) {}

  async createEvalData(evalData: EvalEntity[]): Promise<void> {
    try {
      await this.evalRepository.createEvalDatas(evalData);
    } catch (e) {
      console.log('eval serivce', e.message);
    }
  }

  async getEvalDetail(id: number): Promise<any> {
      const frequencyResult = await this.evalRepository
      .createQueryBuilder("eval_entity")
      .select("eval_entity.from")
      .addSelect("COUNT(eval_entity.from)", "count")
      .groupBy("eval_entity.from")
      .having("COUNT(eval_entity.from) > :count", { count: 1 })
      .getRawMany();
      console.log(frequencyResult);

      const targetVal = id;
      const sortedArr = frequencyResult.slice().sort((a, b) => b.count - a.count);
      const countEqualArr = sortedArr.filter(obj => obj.count === sortedArr.find(obj => obj.eval_entity_from === targetVal).count);
      const rank = sortedArr.length - countEqualArr.length + 1;
      const percentile = ((frequencyResult.length - rank) / frequencyResult.length) * 100;

      
      const mostSubject = await this.evalRepository
      .createQueryBuilder("eval_entity")
      .select("eval_entity.projectId")
      .addSelect("eval_entity.index")
      .addSelect("COUNT(eval_entity.projectId)", "count")
      .groupBy("eval_entity.projectId")
      .addGroupBy("eval_entity.index")
      .orderBy("count", "DESC")
      .getOne();
      console.log(mostSubject);

      const found = await this.evalRepository.find(
        { where: {
          from: id
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
    console.log(found.length);
    // var result = timeSpent.toString();
    let result = new Result();
    result.evalCnt = found.length;
    result.evalRatio = percentile;
    result.timeSpentAll = timeSpent;
    result.timeZoneLike = mostFrequentElements.pop();
    result.mostSubject = mostSubject.projectId;
    return  result;
  }
}

/*

return {id, comment, beginAt:begin_at, filledAt:filled_at, projectId:project_id,from:corrector.id, duration, 
	isOutStanding:flags.filter(i => i.id === 9)[0].positive === falle ? false : true


*/
