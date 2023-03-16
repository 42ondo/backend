import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ApiModule } from 'src/api/api.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        ApiModule,
        HttpModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
        }),
      ],
      providers: [AuthService, JwtStrategy],
      controllers: [AuthController],
      module: AuthModule,
    };
  }
}
