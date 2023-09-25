'use client';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import type { CoordinateType, ShopType } from '@/types';

type Props = {
  children?: ReactNode;
};

type ShoppingCartContextType = {
  clientCoordinate: CoordinateType | null;
  shopCoordinates: ShopType | null;
  setClientCoordinate: Dispatch<SetStateAction<CoordinateType | null>>;
  setShopCoordinates: Dispatch<SetStateAction<ShopType | null>>;
};

const initialValues: ShoppingCartContextType = {
  clientCoordinate: null,
  shopCoordinates: null,
  setClientCoordinate: () => {},
  setShopCoordinates: () => {},
};
const ShoppingCartContext = createContext<ShoppingCartContextType>(initialValues);

function ShoppingCartProvider({ children }: Props) {
  const [clientCoordinate, setClientCoordinate] = useState<ShoppingCartContextType['clientCoordinate']>(null);
  const [shopCoordinates, setShopCoordinates] = useState<ShoppingCartContextType['shopCoordinates']>(null);

  return (
    <ShoppingCartContext.Provider
      value={{ clientCoordinate, shopCoordinates, setClientCoordinate, setShopCoordinates }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);

  return context;
};
