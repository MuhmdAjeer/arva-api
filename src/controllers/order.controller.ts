import { Body, Controller, Post } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import orders from 'razorpay/dist/types/orders';
import { OrderDto } from 'src/dto/order.dto';
import { OrderService } from 'src/services/order.service';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async orderProduct(@Body() body: OrderDto){
    return this.orderService.orderProduct(body);
  }
}

