import { IsNotEmpty } from "class-validator";

export class EvalDtoType {
    id: number;
    comment: string;
	begin_at: string;
	filled_at: string;
	project_id: number;
	corrector: {
		id:number; 
		login:string;
		url:string;
	};
	duration: number;
	flags: any
}
