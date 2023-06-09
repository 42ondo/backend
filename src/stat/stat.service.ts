import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatEntity } from './stat.entity';
import { StatRepository } from './stat.repository';

@Injectable()
export class StatService {
	constructor(
		@InjectRepository(StatRepository)
		private statRepository: StatRepository,
	  ) {}
	async createStatData(statData: StatEntity) {
		try {
		await this.statRepository.createStatDatas(statData);
	  } catch (e) {
		console.log('stat serivce', e.message);
	  }
	}
	
	async getStatData() :Promise<StatEntity> {
		const data = await this.statRepository.find();
		return (data[0]);
	}
	async updateStatData(statData: StatEntity) :Promise<void> {
		await this.statRepository.update(
		{ index: statData.index }, // 검색 조건
		{ 
		  timeSpentAll: statData.timeSpentAll, 
		  timeZoneLike: statData.timeZoneLike, 
		  mostSubject: statData.mostSubject 
		})
	}}