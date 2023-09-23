import { MenuType } from '@/types';
import Image from 'next/image';
import React from 'react';
import AddToCartButton from './AddToCartButton';
import { convertNumberToMoney } from '@/helpers';

type Props = {
  item: MenuType;
};

function MenuItem({ item }: Props) {
  return (
    <article className='flex flex-col gap-2 w-full p-4 bg-gray-200 rounded-lg'>
      <div className='flex items-center w-full aspect-square bg-gray-300 rounded-md overflow-hidden'>
        <Image className='w-full h-auto aspect-auto' src={item.imageUrl} width={200} height={100} alt={item.name} />
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between'>
          <p>{item.name}</p>
          <p className='font-bold'>{convertNumberToMoney(item.price)}</p>
        </div>
        <AddToCartButton
          item={item}
          className='px-4 py-2 bg-yellow-500 rounded-md hover:bg-yellow-700 hover:text-white transition-colors duration-300'
        >
          Add to Cart
        </AddToCartButton>
      </div>
    </article>
  );
}

export default MenuItem;
