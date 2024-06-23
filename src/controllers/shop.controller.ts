import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Shop, ShopSchema } from 'src/schemas/shop.schema';
import { ShopsService } from 'src/services/shop.service';

@Controller('shops')
@ApiTags('Shops')
export class ShopController {
  constructor(private shopService: ShopsService) {}

  @Get()
  @ApiResponse({ type: Shop })
  async getShops() {
    return await this.shopService.findAllShops();
  }

  @Get('/:id')
  async getShop(@Param('id') id: string) {
    return await this.shopService.findShop(id);
  }
}
