import { ReactNode } from 'react';
import { getShopsService } from '@/services/api';
import Sidebar from '@/components/Sidebar';

type Props = {
  children?: ReactNode;
};
export const cache = 'no-store';

async function ShopLayout({ children }: Props) {
  const result = await getShopsService();

  return (
    <div className='flex flex-col md:flex-row gap-4 w-full h-full'>
      {result.status === 'success' && <Sidebar shops={result.data.shops} />}

      {children}
    </div>
  );
}

export default ShopLayout;
