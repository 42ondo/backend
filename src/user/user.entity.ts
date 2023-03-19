import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	index: number;
	@Column({unique:true})
	id: number;
	@Column()
	login: string;
	@Column()
	imgUrl: string;
	@Column({default: 42, type: 'float'})
	ondo: number;
}
