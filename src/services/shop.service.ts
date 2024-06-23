import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopModel } from 'src/schemas/shop.schema';

@Injectable()
export class ShopsService {
  constructor(@InjectModel(Shop.name) private shopModel: Model<Shop>) {}

  async findAllShops(): Promise<Shop[]> {
    return await this.shopModel.find().populate('products').exec();
  }

  async findShop(id: string) {
    return await this.shopModel.findById(id).populate('products').exec();
  }
}
