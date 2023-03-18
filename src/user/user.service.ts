import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvalEntity } from 'src/eval/eval.entity';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUserByName(login: string): Promise<UserEntity>
  {
    const found = await this.userRepository.findOne(
      { where: {
          login: login
      },
      });
      return (found);
  }
  
  async getIdByName(name: string): Promise<number> {
    const found = await this.userRepository.findOne(
      { where: {
          login: name
        },
        });
        ;
        return(found.id);
    }

  async createUserData(userData: UserEntity[]): Promise<void> {
    try {
      await this.userRepository.createUserData(userData);
    } catch (e) {
      console.log('user Service', e.message);
    }
  }
}
