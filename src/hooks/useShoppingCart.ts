'use client';
import type { CartProductType } from '@/types';
import { useLocalStorage } from '@uidotdev/usehooks';

export const useShoppingCart = () => {
  const [value, setValue] = useLocalStorage<CartProductType[]>('shopping-cart', []);

  return { value, setValue };
};
