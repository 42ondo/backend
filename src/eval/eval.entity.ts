import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvalEntity extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	comment: string;
	@Column()
	feedback: string;
	@Column()
	begin_at: string;
	@Column()
	filled_at: string;
	@Column()
	project_id: number;
}
