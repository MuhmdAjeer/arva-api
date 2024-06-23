import { Injectable } from '@nestjs/common';
import { PaymentOrderDto } from 'src/dto/payment.dto';
import Razorpay from 'razorpay';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  private razorpay: Razorpay;

  constructor(private configService: ConfigService) {
    this.razorpay = new Razorpay({
      key_id: this.configService.getOrThrow('RAZORPAY_KEY_ID'),
      key_secret: this.configService.getOrThrow('RAZORPAY_KEY_SECRET'),
    });
  }

  async createPaymentOrder(orderDto: PaymentOrderDto) {
    const order = await this.razorpay.orders.create({ ...orderDto });
    return order;
  }

  async handleWebhook(body: any) {
    console.log(body.payload.payment);
  }
}
