import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { UserEntity } from './user.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUserData(userEntitys: UserEntity[]): Promise<void> {
    const data = this.create(userEntitys);

    await this.save(data);
  }

	async getOndoRank(count: number): Promise<{id: number, name: string, imgUrl: string, ondo: number}[]> {
		const topWords = await this
			.createQueryBuilder('user_entity')
			.select('user_entity.ondo', 'ondo')
			.addSelect('user_entity.login', 'login')
			.addSelect('user_entity.imgUrl', 'imgUrl')
			.addSelect('user_entity.id', 'id')
			.orderBy('user_entity.ondo', 'DESC')
			.limit(count)
			.getRawMany();
		console.log(topWords);
		return topWords.map((result) => ({ 
			id: result.id, 
			name: result.login, 
			imgUrl: result.imgUrl, 
			ondo: result.ondo 
		}));
	}
}
