export type OrderType = {
  name: string;
  email: string;
  phone: number;
  address: string;
  products: {
    product: string;
    count: number;
  }[];
  coupon: string | null;
};
