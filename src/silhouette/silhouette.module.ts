import { Module } from '@nestjs/common';
import { SilhouetteService } from './silhouette.service';
import { SilhouetteController } from './silhouette.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Silhouette, SilhouetteSchema } from './silhouette.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Silhouette.name, schema: SilhouetteSchema },
    ]),
  ],
  providers: [SilhouetteService],
  controllers: [SilhouetteController],
})
export class SilhouetteModule {}
