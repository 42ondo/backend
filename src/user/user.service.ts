import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUserData(userData: UserEntity[]): Promise<void> {
    try {
      await this.userRepository.createUserData(userData);
    } catch (e) {
      console.log('user Service', e.message);
    }
  }
}
