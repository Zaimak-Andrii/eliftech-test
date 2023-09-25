import type { CartProductType } from '@/types';
import ShoppingCardProduct from './ShoppingCardProduct';

type Props = {
  list: CartProductType[];
};

function ProductsList({ list }: Props) {
  if (list.length === 0) return <p>The cart is empty.</p>;

  return (
    <>
      <ul className='flex-grow flex flex-col gap-4 w-full '>
        {list.map((item) => (
          <li key={item._id}>
            <ShoppingCardProduct item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductsList;
