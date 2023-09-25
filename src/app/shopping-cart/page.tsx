import { ShoppingCartForm, ShoppingCartProvider } from '@/components/shoppingCart';
import Map from '@/components/shoppingCart/Map';

export default function ShoppingCartPage() {
  return (
    <section className='flex flex-col gap-4 h-full'>
      <ShoppingCartProvider>
        <Map className='w-full h-[40%]' />
        <ShoppingCartForm />
      </ShoppingCartProvider>
    </section>
  );
}
