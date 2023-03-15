import { Body, Controller, Get, Post } from '@nestjs/common';
import { EvalEntity } from './eval.entity';
import { EvalService } from './eval.service';

@Controller('eval')
export class EvalController {
	constructor(private evalservice: EvalService) {}

	@Get()
	create_data(): Promise<any> {
		return (this.evalservice.create_data());
	}
}
