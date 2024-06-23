import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import Razorpay from 'razorpay';
import { RazorpayWebhook } from 'razorpay/dist/utils/razorpay-utils';
import { PaymentService } from 'src/services/payment.service';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('webhook')
  async webhook(@Body() body: any) {
    await this.paymentService.handleWebhook(body);
  }
}
