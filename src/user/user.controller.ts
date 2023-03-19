import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { query } from 'express';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { Query } from '@nestjs/common';

class title {
	title: string;
}

@Controller('user')
export class UserController {

	constructor (private userService: UserService) {}

	@Get('/:name')
	@UseGuards(JwtAuthGuard)
	getUserByName(@Param('name') name: string) :Promise<UserEntity> {
		return (this.userService.getUserByName(name))
	}

	@Get('/title/:name')
	@UseGuards(JwtAuthGuard)
	getTitle(@Param('name') name: string):title {
		// return (this.wordService.getTitle());
		let result = new title;
		result.title = name;
		return (result);
	}
}
