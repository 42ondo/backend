import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EvalModule } from './eval/eval.module';
import { ApiModule } from './api/api.module';
import { Cron, ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { UserModule } from './user/user.module';
//import { OndoModule } from './ondo/ondo.module';
import { WordModule } from './word/word.module';
import { StatModule } from './stat/stat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
	ScheduleModule.forRoot(),
	AuthModule.forRoot(),
	EvalModule,
	ApiModule,
	CronModule,
	UserModule,
	//OndoModule,
	WordModule,
	StatModule,
  ],
})
export class AppModule {}
