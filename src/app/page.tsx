import { Route } from '@/constants';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(Route.SHOP);
}
