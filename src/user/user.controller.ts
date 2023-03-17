import { Controller, Get, Param } from '@nestjs/common';
import { query } from 'express';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { Query } from '@nestjs/common';

@Controller('user')
export class UserController {

	constructor (private userService: UserService) {}

	@Get('/:name')
	getUserByName(@Param('name') name: string) :Promise<UserEntity> {
		return (this.userService.getUserByName(name))
	}

	// @Get('/user/title/:name')
	// getTitle(@Param('name') name: string) :Promise<string> {
		// return (this.wordService.getTitle());
	// }

}
