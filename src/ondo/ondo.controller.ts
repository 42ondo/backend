import { Controller, Get } from '@nestjs/common';
import { OndoService } from './ondo.service';

class Ondo {
	ondo : number
};

@Controller('ondo')
export class OndoController {

	constructor (private ondoService: OndoService) {}


	@Get('/average')
	async handler2 ():Promise<Ondo> { // renaming
		console.log("test");
		return (await this.ondoService.getOndoAverage());
	}
	@Get('/ondo/rank')
	handler () { // renaming
		// return this.ondoService.getOndoRank();
	}

}
