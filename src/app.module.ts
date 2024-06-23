import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopController } from './controllers/shop.controller';
import { ShopsService } from './services/shop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './schemas/shop.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { ProductsController } from './controllers/product.controller';
import { ProductService } from './services/products.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
        dbName: configService.get<string>('DATABASE_NAME'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Shop.name, schema: ShopSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [
    AppController,
    ShopController,
    ProductsController,
    OrderController,
    PaymentController,
  ],
  providers: [
    AppService,
    ShopsService,
    ProductService,
    OrderService,
    PaymentService,
  ],
})
export class AppModule {}
