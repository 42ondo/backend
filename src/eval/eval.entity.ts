import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvalEntity extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	//@Column()
	//evaluator: string;

	//@Column()
	//appraisee: string; // 피평가자

	//@Column()
	//comment: string;
	
	//@Column()
	//score: number;

	//@Column()
	//tag: string;

	//@Column()
	//start_eval_time: number;

	//@Column()
	//end_eval_time: number;

	//@Column()
	//subject: string;
}
