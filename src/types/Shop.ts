import { CoordinateType } from '.';

export type ShopType = {
  _id: string;
  name: string;
  logoUrl: string;
  addresses: {
    _id: string;
    name: string;
    coordinate: CoordinateType;
  }[];
};
