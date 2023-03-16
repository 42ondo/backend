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

  async getApi(
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
}
