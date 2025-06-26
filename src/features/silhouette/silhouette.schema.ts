import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Silhouette extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    validate: {
      validator: (v: string) => /^https?:\/\/.+\..+/.test(v),
      message: 'Invalid URL',
    },
  })
  url: string;

  @Prop({ required: true, unique: true })
  slug: string;

  createdAt: Date;
  updatedAt: Date;
}

export const SilhouetteSchema = SchemaFactory.createForClass(Silhouette);
