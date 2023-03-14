import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EvalModule } from './eval/eval.module';

@Module({
	imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
		TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432, 
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD ,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '**/*.entity.{js,ts}'],
      synchronize: true}),
		AuthModule,
		EvalModule,
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
