import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([UserRepository]),
	],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
