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
    private statService: StatService,
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

    const data = await this.evalRepository.find({
      where: { 
        beginAt: Between(weekAgo.toISOString(), today.toISOString()),
      },
    });

		let i = -1;
		var timeSpent = 0;
		const evalTimeCnt = [];
		while (data[++i])
		{
		  const beginAt = new Date(data[i].beginAt);
		  const filledAt = new Date(data[i].filledAt);
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
		  .addSelect("eval_entity.index")
		  .addSelect("COUNT(eval_entity.projectId)", "count")
		  .groupBy("eval_entity.projectId")
		  .addGroupBy("eval_entity.index")
		  .orderBy("count", "DESC")
		  .getOne();
      let statEntitiy = new StatEntity;
      statEntitiy.evalCnt = data.length;
      statEntitiy.timeSpentAll = timeSpent;
      statEntitiy.timeZoneLike = mostFrequentElements.pop();
      statEntitiy.mostSubject = mostSubject.projectId;

      return (statEntitiy);
  }

  async getEvalDetail(id: number): Promise<any> {

      const frequencyResult = await this.evalRepository
      .createQueryBuilder("eval_entity")
      .select("eval_entity.from")
      .addSelect("COUNT(eval_entity.from)", "count")
      .groupBy("eval_entity.from")
      .having("COUNT(eval_entity.from) > :count", { count: 0 })
      .getRawMany();

      console.log((await this.evalRepository.find()).length);
      console.log(await this.evalRepository.find({
        where: {
          from: id,
        },
      }));
      const targetVal = id;
      const sortedArr = frequencyResult.slice().sort((a, b) => b.count - a.count);
      console.log((await this.evalRepository.find()).length, sortedArr.length);
      let sortedArrCount = sortedArr.find(obj => obj.eval_entity_from === targetVal)?.count;
      console.log("sortedarrCount", sortedArrCount, frequencyResult.find(obj => obj.eval_entity_from === targetVal)?.count);
      const countEqualArr = sortedArr.filter(obj => obj.count === sortedArrCount);
      console.log(countEqualArr.length);
      const rank = sortedArr.length - countEqualArr.length + 1;
      console.log(rank);
      console.log(frequencyResult.length);
      const percentile = (rank / frequencyResult.length) * 100;

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


