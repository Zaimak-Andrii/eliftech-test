import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const fetchShops = async () => {
  const result = await fetch('http://localhost:3000/api/shops');
  const data = await result.json();

  return data.shops;
};

async function ShopLayout({ children }: Props) {
  const shops = await fetchShops();

  return (
    <div className='flex gap-4 w-full h-full'>
      <Sidebar shops={shops} />
      {children}
    </div>
  );
}

export default ShopLayout;
