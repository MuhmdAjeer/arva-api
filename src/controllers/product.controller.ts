import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { ProductQueryDto } from 'src/dto/shop.dto';
import { Shop, ShopSchema } from 'src/schemas/shop.schema';
import { ProductService } from 'src/services/products.service';
import { ShopsService } from 'src/services/shop.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productsService: ProductService) {}

  @ApiExtraModels(ProductQueryDto)
  @Get('shop/:id')
  async getProductsBy(
    @Param('id') id: string,
    @Query() query: ProductQueryDto,
  ) {
    return await this.productsService.getProductsByShop(id, query);
  }
}
