'use client';
import type { CartProductType } from '@/types';
import useLocalStorage from './useLocalStorage';

export const useShoppingCart = () => {
  const [value, setValue] = useLocalStorage<CartProductType[]>('shopping-cart', []);

  return { value, setValue };
};
