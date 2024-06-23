import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Ref, Required } from 'src/decorators/mongoose.decorator';
import { OrderStatus } from 'src/dto/order.dto';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  _id: string;

  @Ref('Product')
  product: string;

  @Required()
  quantity: number;

  @Prop({ default: OrderStatus.pending, enum: OrderStatus })
  status: OrderStatus = OrderStatus.pending;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
