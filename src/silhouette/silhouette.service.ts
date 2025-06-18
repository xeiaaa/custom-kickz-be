import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Silhouette } from './silhouette.schema';

@Injectable()
export class SilhouetteService {
  constructor(
    @InjectModel(Silhouette.name) private silhouetteModel: Model<Silhouette>,
  ) {}

  async create(data: Partial<Silhouette>): Promise<Silhouette> {
    const created = new this.silhouetteModel(data);
    return created.save();
  }

  async findAll(): Promise<Silhouette[]> {
    return this.silhouetteModel.find().exec();
  }

  async findOne(id: string): Promise<Silhouette> {
    const found = await this.silhouetteModel.findById(id).exec();
    if (!found) throw new NotFoundException('Silhouette not found');
    return found;
  }

  async update(id: string, data: Partial<Silhouette>): Promise<Silhouette> {
    const updated = await this.silhouetteModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Silhouette not found');
    return updated;
  }

  async remove(id: string): Promise<Silhouette> {
    const deleted = await this.silhouetteModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Silhouette not found');
    return deleted;
  }

  async findBySlug(slug: string): Promise<Silhouette> {
    const found = await this.silhouetteModel.findOne({ slug }).exec();
    if (!found) throw new NotFoundException('Silhouette not found');
    return found;
  }
}
