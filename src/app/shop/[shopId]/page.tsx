import MenuList from '@/components/MenuList';
import { getShopInfoByIdService, getShopMenuService } from '@/services/api';

type Props = {
  params: {
    shopId: string;
  };
};

export default async function ShopMenu({ params: { shopId } }: Props) {
  const [shopInfoResponse, menuResponse] = await Promise.all([
    getShopInfoByIdService(shopId),
    getShopMenuService(shopId),
  ]);

  return (
    <section className=' flex flex-col w-full p-4 bg-blue-50 rounded-lg'>
      {shopInfoResponse.status === 'success' && (
        <h1 className='mb-4 text-center text-xl font-bold'>{shopInfoResponse.data.shop.name} menu:</h1>
      )}
      {menuResponse.status === 'success' && <MenuList list={menuResponse.data.menu} />}
    </section>
  );
}
