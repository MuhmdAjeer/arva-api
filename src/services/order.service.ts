import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto, OrderResponseDto } from 'src/dto/order.dto';
import { Order } from 'src/schemas/order.schema';
import { Product } from 'src/schemas/product.schema';
import { PaymentService } from './payment.service';
import Razorpay from 'razorpay';
import { Orders } from 'razorpay/dist/types/orders';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private paymentService: PaymentService,
  ) {}

  async orderProduct(orderProductDto: OrderDto): Promise<OrderResponseDto> {
    const product = await this.productModel.findById(
      orderProductDto.product_id,
    );
    if (!product) {
      throw new NotFoundException();
    }

    const order = await this.orderModel.create({
      product,
      quantity: orderProductDto.quantity,
    });

    const razorpayOrder = await this.paymentService.createPaymentOrder({
      amount: product.price * orderProductDto.quantity * 100,
      currency: 'INR',
    });

    order.save();
    return {
      amount: razorpayOrder.amount.toString(),
      currency: razorpayOrder.currency,
      id: razorpayOrder.id,
    };
  }
}
