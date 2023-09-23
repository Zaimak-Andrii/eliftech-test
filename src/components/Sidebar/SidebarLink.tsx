import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import type { LinkType } from '@/types';

function SidebarLink({ className, children, disabled, active, ...props }: LinkType) {
  return (
    <Link
      className={twMerge(
        `cursor-pointer block w-full px-4 py-2 text-center text-white bg-blue-300 rounded-sm
        ${active ? 'bg-blue-400' : ''}
        ${!disabled ? 'hover:bg-blue-400' : ''} transition-colors duration-300 
        ${disabled ? 'pointer-events-none opacity-30' : ''}`,
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export default SidebarLink;
