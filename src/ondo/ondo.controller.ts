import { Controller, Get } from '@nestjs/common';
import { OndoService } from './ondo.service';

@Controller('ondo')
export class OndoController {

	constructor (private ondoService: OndoService) {}

	@Get('/ondo/rank')
	handler () { // renaming
		// return this.ondoService.getOndoRank();
	}

	@Get('/average')
	handler2 () { // renaming
		//return this.ondoService.getOndoAverage();
	}
}
