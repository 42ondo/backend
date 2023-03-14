import { Controller, Post } from '@nestjs/common';
import { EvalService } from './eval.service';

@Controller('eval')
export class EvalController {
    constructor(private evalservice: EvalService) {}

}
