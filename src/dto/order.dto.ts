import { IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsString()
  product_id: string;

  @IsNumber()
  quantity: number;
}

export class OrderResponseDto {
  id: string;
  amount: string;
  currency: string;
}

export enum OrderStatus {
  pending = 'pending',
  success = 'success',
  cancelled = 'cancelled',
  failed = 'failed',
}
