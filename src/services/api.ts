import type { ShopType, FetchResponseType, MenuType, OrderType } from '@/types';

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const fetcher = async <T>(fn: Function): Promise<FetchResponseType<T>> => {
  try {
    const result = await fn();

    if (!result.ok) throw new Error('Bad request.');

    const data = await result.json();

    return data;
  } catch (error) {
    return {
      status: 'failed',
      message: (error as Error).message,
    };
  }
};

export const getShopsService = async () => {
  const data = await fetcher<{ shops: ShopType[] }>(async () => await fetch(`${baseUrl}/shops`));

  return data;
};

export const getShopInfoByIdService = async (shopId: string) => {
  const data = await fetcher<{ shop: ShopType }>(async () => await fetch(`${baseUrl}/shops/${shopId}`));

  return data;
};

export const getShopMenuService = async (shopId: string) => {
  const data = await fetcher<{ menu: MenuType[] }>(async () => await fetch(`${baseUrl}/shops/${shopId}/menu`));

  return data;
};

export const addOrderService = async (body: OrderType) => {
  const data = await fetcher<{ order: OrderType }>(
    async () =>
      await fetch(`${baseUrl}/orders`, {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify(body),
      })
  );

  return data;
};
