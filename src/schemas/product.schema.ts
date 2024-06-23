import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Shop } from './shop.schema';
import { Category } from './category.schema';
import { categoryEnum } from 'src/dto/shop.dto';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  _id: string;
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop([String])
  images: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Shop', required: true })
  shop: Shop;

  @Prop({ enum: categoryEnum })
  category: categoryEnum;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
