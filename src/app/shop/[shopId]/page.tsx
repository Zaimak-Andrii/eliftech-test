import MenuList from '@/components/MenuList';
import type { MenuType, ShopType } from '@/types';

type Props = {
  params: {
    shopId: string;
  };
};

const fetchShopInfo = async (shopId: string): Promise<ShopType> => {
  const result = await fetch(`http://localhost:3000/api/shops/${shopId}`);
  const data = await result.json();

  return data.shop;
};

const fetchShopMenu = async (shopId: string): Promise<MenuType[]> => {
  const result = await fetch(`http://localhost:3000/api/shops/${shopId}/menu`);
  const data = await result.json();

  return data.menu;
};

export default async function ShopMenu({ params: { shopId } }: Props) {
  const [shop, menu] = await Promise.all([fetchShopInfo(shopId), fetchShopMenu(shopId)]);

  return (
    <section className=' flex flex-col w-full p-4 bg-blue-50 rounded-lg'>
      <h1 className='mb-4 text-center text-xl font-bold'>{shop.name} menu:</h1>
      <MenuList list={menu} />
    </section>
  );
}
