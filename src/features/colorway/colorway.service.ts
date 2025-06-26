import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Colorway } from './colorway.schema';

@Injectable()
export class ColorwayService {
  constructor(
    @InjectModel(Colorway.name) private colorwayModel: Model<Colorway>,
  ) {}

  async create(data: Partial<Colorway>): Promise<Colorway> {
    const created = new this.colorwayModel(data);
    return created.save();
  }

  async findAll(userId: Types.ObjectId): Promise<Colorway[]> {
    return this.colorwayModel.find({ userId }).populate('silhouetteId').exec();
  }

  async findOne(id: string, userId: Types.ObjectId): Promise<Colorway> {
    const found = await this.colorwayModel.findOne({ _id: id, userId }).exec();
    if (!found) throw new NotFoundException('Colorway not found');
    return found;
  }

  async update(
    id: string,
    userId: Types.ObjectId,
    data: Partial<Colorway>,
  ): Promise<Colorway> {
    const updated = await this.colorwayModel
      .findOneAndUpdate({ _id: id, userId }, data, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Colorway not found');
    return updated;
  }

  async remove(id: string, userId: Types.ObjectId): Promise<Colorway> {
    const deleted = await this.colorwayModel
      .findOneAndDelete({ _id: id, userId })
      .exec();
    if (!deleted) throw new NotFoundException('Colorway not found');
    return deleted;
  }
}
