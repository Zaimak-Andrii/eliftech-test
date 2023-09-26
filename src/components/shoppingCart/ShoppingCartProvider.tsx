'use client';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import type { ClientAddressType, CoordinateType, ShopType } from '@/types';

type Props = {
  children?: ReactNode;
};

type ShoppingCartContextType = {
  client: ClientAddressType | null;
  shop: ShopType | null;
  selectedShopCoordinate: CoordinateType | null;
  setClient: Dispatch<SetStateAction<ClientAddressType | null>>;
  setShop: Dispatch<SetStateAction<ShopType | null>>;
  setSelectedShopCoordinate: Dispatch<SetStateAction<CoordinateType | null>>;
};

const initialValues: ShoppingCartContextType = {
  client: null,
  shop: null,
  selectedShopCoordinate: null,
  setClient: () => {},
  setShop: () => {},
  setSelectedShopCoordinate: () => {},
};
const ShoppingCartContext = createContext<ShoppingCartContextType>(initialValues);

function ShoppingCartProvider({ children }: Props) {
  const [client, setClient] = useState<ShoppingCartContextType['client']>(null);
  const [shop, setShop] = useState<ShoppingCartContextType['shop']>(null);
  const [selectedShopCoordinate, setSelectedShopCoordinate] =
    useState<ShoppingCartContextType['selectedShopCoordinate']>(null);

  return (
    <ShoppingCartContext.Provider
      value={{ client, shop, selectedShopCoordinate, setClient, setShop, setSelectedShopCoordinate }}
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
