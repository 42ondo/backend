import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvalEntity extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	comment: string;
	@Column()
	from:number;
	@Column()
	beginAt: string;
	@Column()
	filledAt: string;
	@Column()
	duration: number;
	@Column()
	isOutStanding: boolean;
	@Column()
	projectId: number;
}
