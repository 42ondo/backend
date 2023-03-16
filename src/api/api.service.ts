import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class ApiService {
  private accessToken: string;

  constructor(private http: HttpService) {
    // get access token for authorization
    axios
      .post('https://api.intra.42.fr/v2/oauth/token', {
        grant_type: 'client_credentials',
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_SECRET,
      })
      .then((response) => {
        this.accessToken = response.data.access_token;
        console.log(`get access_token ${this.accessToken}`);
      })
      .catch((error: AxiosError) => console.log(error.message));
  }

  private axiosConfig() {
    return {
      baseURL: 'https://api.intra.42.fr/v2',
      headers: { Authorization: `Bearer ${this.accessToken}` },
    };
  }

  private async getApi(
    url: string,
    data: any,
    onSuccess: (response: any) => void,
  ) {
    const request = this.http
    .get(url, { params: data, ...this.axiosConfig() })
    .pipe(map(onSuccess))
      .pipe(
        catchError((error) => {
          console.log(error);
          throw new ForbiddenException(error.message);
        }),
      );

    const response = await lastValueFrom(request);
    return response;
  }


  public async getFeedbacks() :Promise<any> {
    return await this.getApi('/scale_teams', { 
		//'range[created_at]': "2023-02-01T00:00:00.000Z,2023-03-14T00:00:00.000Z",
		'filter[campus_id]' :29,
		'filter[user_id]':86834,
		}
		, (response) => {
				const scaleTeamsList = response.data;
				return scaleTeamsList.map(item => {
					const {id, begin_at, filled_at, team:{project_id}, comment, feedback} = item;
					return {id, begin_at, filled_at, project_id, comment, feedback};
					}
				);
			}
		);
	}


  public async getUsersData() :Promise<any> {
	return await this.getApi('/campus/29/users'
		, null
		, (response) => {
				const usersList = response.data;
				return usersList.map(item => {
					const {id, login, image:{link}} = item;
					return {id, login, link};
					}
				);
			}
		);
	}
}
