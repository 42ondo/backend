import { HttpException, Injectable } from '@nestjs/common';
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
        console.log(found);
        if (found === null)
          throw new HttpException('Invalid Id', 404);
        return(found.id);
    }

  async createUserData(userData: UserEntity[]): Promise<void> {
    for (const user of userData) {
      try {
        await this.userRepository.createUserData(user);
        
      } catch (e) {
        console.log('user Service', e.message);
      }
    }
  }
  async resetUserOndo(): Promise<void> {
    const datas = await this.userRepository.find();
    for (const data of datas)
    {
        await this.userRepository.update({index: data.index}, {ondo: 42})
    }
  }
}