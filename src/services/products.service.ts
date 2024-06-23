import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductQueryDto } from 'src/dto/shop.dto';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getProductsByShop(
    id: string,
    query: ProductQueryDto,
  ): Promise<Product[]> {
    return await this.productModel.find({ shop: id, category: query.category });
  }
}
