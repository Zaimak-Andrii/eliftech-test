'use client';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import type { LinkType } from '@/types';
import NavigationLink from './NavigationLink';
import { useShoppingCart } from '@/hooks';

function NavigationCartLink({ className, children, ...props }: LinkType) {
  const { value } = useShoppingCart();
  return (
    <NavigationLink className='relative flex max-md:w-fit' {...props}>
      <span className='md:hidden w-full'>
        <AiOutlineShoppingCart size={24} />
      </span>
      <span className='max-md:hidden'>{children}</span>
      {value.length > 0 && (
        <span className='absolute top-0 right-0 flex items-center justify-center w-[20px] h-[20px] text-xs bg-red-500 translate-x-1/2 -translate-y-1/2 rounded-full'>
          {value.length}
        </span>
      )}
    </NavigationLink>
  );
}

export default NavigationCartLink;
