'use client';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import type { ClientAddressType, ShopType } from '@/types';

type Props = {
  children?: ReactNode;
};

type ShoppingCartContextType = {
  client: ClientAddressType | null;
  shop: ShopType | null;
  setClient: Dispatch<SetStateAction<ClientAddressType | null>>;
  setShop: Dispatch<SetStateAction<ShopType | null>>;
};

const initialValues: ShoppingCartContextType = {
  client: null,
  shop: null,
  setClient: () => {},
  setShop: () => {},
};
const ShoppingCartContext = createContext<ShoppingCartContextType>(initialValues);

function ShoppingCartProvider({ children }: Props) {
  const [client, setClient] = useState<ShoppingCartContextType['client']>(null);
  const [shop, setShop] = useState<ShoppingCartContextType['shop']>(null);

  return (
    <ShoppingCartContext.Provider value={{ client, shop, setClient, setShop }}>{children}</ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);

  return context;
};
