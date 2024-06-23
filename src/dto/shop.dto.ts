export class ProductQueryDto {
  category?: categoryEnum;
}

export enum categoryEnum {
  COFFEE = 'coffee',
  DRINKS = 'drinks',
  FOODS = 'foods',
}
