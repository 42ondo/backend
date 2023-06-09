import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { OndoService } from './ondo.service';

@Controller('ondo')
export class OndoController {
  constructor(private ondoService: OndoService) {}

  @Get('/average')
  @UseGuards(JwtAuthGuard)
  async handler2(): Promise<any> {
    // renaming
    return await this.ondoService.getOndoAverage();
  }
  @Get('/rank')
  @UseGuards(JwtAuthGuard)
  async handler(@Query('count') count: number) {
    const users = await this.ondoService.getOndoRank(count);
    return { users };
  }
}
