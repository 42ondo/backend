import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiService } from 'src/api/api.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { EvalService } from './eval.service';

@Controller('eval')
export class EvalController {
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private evalService: EvalService,
  ) {}

  @Get()
  async handleCron() {
    // 자정마다 실행, 1. scaleTeam 정보 받아서 가공하기 2. eval DB에 넣기 3. user DB에 넣고 4. 기타등등
    const data = await this.get42EvalData();

    this.evalService.createEvalData(data);
    this.userService.createUserData(data.map((item) => item.corrector));
  }
  private async get42EvalData(): Promise<any> {
    return await this.apiService.getApi(
      '/scale_teams',
      {
        'range[created_at]':
          '2022-02-01T00:00:00.000Z,2023-03-14T00:00:00.000Z',
        'filter[campus_id]': 29,
      },
      (response) => {
        return response.data
          .filter((item) => item.flag.positive === true)
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
}
