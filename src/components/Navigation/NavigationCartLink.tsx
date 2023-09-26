'use client';
import type { LinkType } from '@/types';
import NavigationLink from './NavigationLink';
import { useShoppingCart } from '@/hooks';

type Props = {};

function NavigationCartLink({ className, children, ...props }: LinkType) {
  const { value } = useShoppingCart();
  return (
    <NavigationLink className='relative' {...props}>
      {children}
      {value.length > 0 && (
        <span className='absolute top-0 right-0 flex items-center justify-center w-[20px] h-[20px] text-xs bg-red-500 translate-x-1/2 -translate-y-1/2 rounded-full'>
          {value.length}
        </span>
      )}
    </NavigationLink>
  );
}

export default NavigationCartLink;
