import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor (
		@InjectRepository(UserRepository)
		private userRepository: UserRepository
	) {}

	async createUserData(userData: UserEntity[]): Promise<void> {
		this.userRepository.createUserData(userData);
	}
}
