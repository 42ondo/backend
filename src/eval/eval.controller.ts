import { Body, Controller, Post } from '@nestjs/common';
import { EvalEntity } from './eval.entity';
import { EvalService } from './eval.service';

@Controller('eval')
export class EvalController {
    constructor(private evalservice: EvalService) {}

	//@Post()
	//create_data( @Body('evaluator') evaluator: string): Promise<EvalEntity> {
	//	return (this.evalservice.create_data(evaluator));
	//}

	@Post()
	create_data(): Promise<EvalEntity> {
		return (this.evalservice.create_data());
	}
}
