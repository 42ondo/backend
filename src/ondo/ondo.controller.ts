import { Controller, Get, Param } from '@nestjs/common';
import { OndoService } from './ondo.service';

@Controller('ondo')
export class OndoController {

	constructor (private ondoService: OndoService) {}


	@Get('/average')
	async handler2 ():Promise<any> { // renaming
		console.log("test");
		return (await this.ondoService.getOndoAverage());
	}
	@Get('/rank/:count')
	async handler (@Param('count') count:number) {
		return await this.ondoService.getOndoRank(count);
	}
}
