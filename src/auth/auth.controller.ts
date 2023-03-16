import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/me')
  async oauthCall(
    @Query('code') code: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.generateAccessToken(code);
    response.cookie('auth', accessToken, {
      httpOnly: true,
      sameSite: true,
    });

    return accessToken;
  }

  @Get('/logout')
  deleteCookie(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('auth', {
      httpOnly: true,
      sameSite: true,
    });
    return 'Logged out successfully';
  }
}
