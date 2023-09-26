import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import type { LinkType } from '@/types';

function NavigationLink({ className, children, ...props }: LinkType) {
  return (
    <Link
      className={twMerge(
        'cursor-pointer flex py-2 px-4 text-white bg-blue-400 rounded hover:bg-blue-800 transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export default NavigationLink;
