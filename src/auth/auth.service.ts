import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios, { AxiosError } from 'axios';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private http: HttpService) {}
  private async get42AccessToken(code: string) {
    let accessToken;
    await axios
      .post('https://api.intra.42.fr/v2/oauth/token', {
        grant_type: 'authorization_code',
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_SECRET,
        code: code,
        scope: process.env.API_SCOPES,
        redirect_uri: process.env.API_CALLBACK,
      })
      .then((response) => {
        accessToken = response.data.access_token;
        console.log(`get user's access_token ${accessToken}`);
      })
      .catch((error: AxiosError) => {
        console.log(error, error.message);
        throw new HttpException('accessToken error', HttpStatus.UNAUTHORIZED);
      });
    return accessToken;
  }

  private async getUserInfo(token: string): Promise<JwtPayload> {
    let userInfo: JwtPayload;

    await axios
      .get('https://api.intra.42.fr/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { login, id } = response.data;
        userInfo = { login, id };
      })
      .catch((error: AxiosError) => {
        console.log(error, error.message);
        throw new HttpException('accessToken error', HttpStatus.UNAUTHORIZED);
      });

    return userInfo;
  }

  private async identifyUser(code: string): Promise<JwtPayload> {
    const userToken = await this.get42AccessToken(code);
    const user = await this.getUserInfo(userToken);
    return user;
  }

  async generateAccessToken(code: string) {
    const user = await this.identifyUser(code);
    return this.jwtService.sign(JSON.stringify(user));
  }
}
