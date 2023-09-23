import { ShopType } from '.';

export type MenuType = {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  shop: ShopType;
};
