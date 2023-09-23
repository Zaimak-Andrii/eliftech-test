import { ReactNode } from 'react';
import { LinkProps } from 'next/link';

export type LinkType = LinkProps & {
  className?: string;
  active?: boolean;
  disabled?: boolean;
  children: ReactNode;
};
