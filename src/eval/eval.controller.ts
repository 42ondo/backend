import { Body, Controller, Get, Post } from '@nestjs/common';
import { EvalService } from './eval.service';
import { EvalDtoType } from './eval.dto';

@Controller('eval')
export class EvalController {
	constructor(private evalservice: EvalService) {}

	@Get()
	createEvalData(data: EvalDtoType[]): Promise<any> {
		return (this.evalservice.createEvalData(data));
	}
}
