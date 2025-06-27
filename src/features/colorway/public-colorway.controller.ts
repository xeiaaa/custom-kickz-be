import { Controller, Get, Query, Param } from '@nestjs/common';
import { ColorwayService } from './colorway.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('api/public/colorways')
export class PublicColorwayController {
  constructor(private readonly colorwayService: ColorwayService) {}

  @Get()
  @Public()
  findAllPublic(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const offsetNum = offset ? parseInt(offset, 10) : 0;

    return this.colorwayService.findPublic(limitNum, offsetNum);
  }

  @Get(':id')
  @Public()
  findOnePublic(@Param('id') id: string) {
    return this.colorwayService.findOnePublic(id);
  }
}
