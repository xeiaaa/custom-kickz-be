import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SilhouetteService } from './silhouette.service';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Public } from 'src/common/decorators/public.decorator';

class CreateSilhouetteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  slug: string;
}

@Public()
@Controller('api/silhouette')
export class SilhouetteController {
  constructor(private readonly silhouetteService: SilhouetteService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createDto: CreateSilhouetteDto) {
    return this.silhouetteService.create(createDto);
  }

  @Get()
  findAll() {
    return this.silhouetteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.silhouetteService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateSilhouetteDto>,
  ) {
    return this.silhouetteService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.silhouetteService.remove(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.silhouetteService.findBySlug(slug);
  }
}
