import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HydratedDocument,
  Model,
  Mongoose,
  SchemaTypes,
} from 'mongoose';
import { Product, ProductSchema } from './product.schema';

export type ShopDocument = HydratedDocument<Shop>;

@Schema()
export class Location {
  type: string;
  coordinates: number[];
}

@Schema()
export class Shop {
  _id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ type: Location, required: true })
  location: Location;

  @Prop([String])
  images: string[];

  products: Product[];
}

export class ShopModel extends Model<Shop> {}

export const ShopSchema = SchemaFactory.createForClass(Shop);
ShopSchema.index({ location: '2dsphere' });

ShopSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'shop',
});

ShopSchema.set('toObject', { virtuals: true });
ShopSchema.set('toJSON', { virtuals: true });
