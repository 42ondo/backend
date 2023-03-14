import { IsNotEmpty } from "class-validator";

export class EvalDtoType {
	@IsNotEmpty()
    id: number;
	@IsNotEmpty()
    comment: string;
	@IsNotEmpty()
    feedback: string;
}
