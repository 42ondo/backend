import { Controller, Get, Param, Query } from '@nestjs/common';
import { OndoService } from './ondo.service';

@Controller('ondo')
export class OndoController {
  constructor(private ondoService: OndoService) {}

  @Get('/average')
  async handler2(): Promise<any> {
    // renaming
    return await this.ondoService.getOndoAverage();
  }
  @Get('/rank')
  async handler(@Query('count') count: number) {
    const users = await this.ondoService.getOndoRank(count);
    return { users };
  }
}
