'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { ShopType } from '@/types';
import SidebarLink from './SidebarLink';
import { Route } from '@/constants';
import { useShoppingCart } from '@/hooks';

type Props = {
  shops: ShopType[];
};

function Sidebar({ shops }: Props) {
  const { shopId } = useParams();
  const router = useRouter();
  const { value: shoppingCart } = useShoppingCart();

  const cartShopId = shoppingCart.at(0)?.shop._id;

  useEffect(() => {
    if (shoppingCart.length > 0 && shopId !== cartShopId) {
      router.replace(`${Route.SHOP}/${cartShopId}`);
    }
  }, [cartShopId, router, shoppingCart, shopId]);

  return (
    <aside className='min-w-[300px] h-full p-4 bg-blue-50 rounded-lg'>
      <h2 className='mb-4 text-center text-lg font-bold'>Shops:</h2>
      <ul className='flex flex-col gap-3'>
        {shops.map(({ _id, name }) => (
          <li key={_id} className='w-full'>
            <SidebarLink
              href={`${Route.SHOP}/${_id}`}
              active={_id === shopId}
              disabled={shoppingCart.length > 0 && cartShopId !== _id}
            >
              {name}
            </SidebarLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
