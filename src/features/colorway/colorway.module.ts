import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Colorway, ColorwaySchema } from './colorway.schema';
import { ColorwayService } from './colorway.service';
import { ColorwayController } from './colorway.controller';
import { PublicColorwayController } from './public-colorway.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Colorway.name, schema: ColorwaySchema },
    ]),
  ],
  providers: [ColorwayService],
  controllers: [ColorwayController, PublicColorwayController],
})
export class ColorwayModule {}
