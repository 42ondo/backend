import { Get, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiService } from 'src/api/api.service';
import { EvalService } from 'src/eval/eval.service';

@Injectable()
export class CronService {
//  private readonly logger = new Logger(CronService.name);
  constructor (
		private apiService:ApiService,
    private evalService:EvalService,
    ) {}

	 @Cron('*/5 * * * * *')
	 async handleCron(){ // 자정마다 실행, 1. scaleTeam 정보 받아서 가공하기 2. eval DB에 넣기 3. user DB에 넣고 4. 기타등등
	 	const data = await this.get42EvalData(); 
	 	console.log(data);
	 	this.evalService.createEvalData(data);
	 	//this.userService.createUserData(data);
	 }



	private async get42EvalData() :Promise<any> {
		return await this.apiService.getApi('/scale_teams', { 
			'range[created_at]': "2023-02-01T00:00:00.000Z,2023-03-14T00:00:00.000Z",
			'filter[campus_id]' :29,
			}
			, (response) => { 
					const scaleTeamsList = response.data;
					return scaleTeamsList.map(item => {
						const {id, begin_at, filled_at, team:{project_id}, comment, corrector, scale:{duration, flags}} = item;
            
						return {id, begin_at, filled_at, project_id, comment, corrector, duration, flags};
						}
					);
				}
			);
		}
}
