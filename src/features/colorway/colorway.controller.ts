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
import { ColorwayService } from './colorway.service';
import { CreateColorwayDto } from './dto/create-colorway.dto';
import { UpdateColorwayDto } from './dto/update-colorway.dto';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { Types } from 'mongoose';
import { UserDocument } from 'src/features/user/user.schema';

@Controller('api/colorways')
export class ColorwayController {
  constructor(private readonly colorwayService: ColorwayService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(
    @AuthUser() user: UserDocument | null,
    @Body() createDto: CreateColorwayDto,
  ) {
    if (!user) throw new Error('Unauthorized');
    return this.colorwayService.create({
      ...createDto,
      userId: user._id,
      silhouetteId: new Types.ObjectId(createDto.silhouetteId),
    });
  }

  @Get()
  findAll(@AuthUser() user: UserDocument | null) {
    if (!user) throw new Error('Unauthorized');
    return this.colorwayService.findAll(new Types.ObjectId(user._id));
  }

  @Get(':id')
  findOne(@AuthUser() user: UserDocument | null, @Param('id') id: string) {
    if (!user) throw new Error('Unauthorized');
    return this.colorwayService.findOne(id, new Types.ObjectId(user._id));
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @AuthUser() user: UserDocument | null,
    @Param('id') id: string,
    @Body() updateDto: UpdateColorwayDto,
  ) {
    if (!user) throw new Error('Unauthorized');
    return this.colorwayService.update(
      id,
      new Types.ObjectId(user._id),
      updateDto,
    );
  }

  @Delete(':id')
  remove(@AuthUser() user: UserDocument | null, @Param('id') id: string) {
    if (!user) throw new Error('Unauthorized');
    return this.colorwayService.remove(id, new Types.ObjectId(user._id));
  }
}
