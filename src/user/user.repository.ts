import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { UserEntity } from './user.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUserData(userEntitys: UserEntity): Promise<void> {
    const data = this.create(userEntitys);

    await this.save(data);
  }
}
