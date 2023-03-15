import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvalEntity extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	comment: string;

	@Column()
	feedback: string;
}
