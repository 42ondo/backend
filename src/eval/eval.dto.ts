import { IsNotEmpty } from "class-validator";

export class EvalDtoType {
	@IsNotEmpty()
    id: number;
	@IsNotEmpty()
    comment: string;
	@IsNotEmpty()
    feedback: string;
	@IsNotEmpty()
	begin_at: string;
	@IsNotEmpty()
	filled_at: string;
	@IsNotEmpty()
	project_id: number;
}
