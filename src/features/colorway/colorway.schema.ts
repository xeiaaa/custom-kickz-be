import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Colorway extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: true, default: {} })
  materialMap: Record<string, string>;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'Silhouette', required: true })
  silhouetteId: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export const ColorwaySchema = SchemaFactory.createForClass(Colorway);
