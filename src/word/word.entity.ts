import {	BaseEntity, 
			Column, 
			Entity, 
			PrimaryGeneratedColumn, 
	} from 'typeorm';

@Entity()
export class WordEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	word: string;
	@Column()
	eval_id: number;
	@Column()
	user_id: number;
	@Column()
	project_id: number;
}
