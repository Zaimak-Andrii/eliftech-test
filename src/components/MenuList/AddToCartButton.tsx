'use client';

import { HTMLAttributes } from 'react';
import { useShoppingCart } from '@/hooks';
import { MenuType } from '@/types';
import { toast } from 'react-toastify';

type Props = HTMLAttributes<HTMLButtonElement> & {
  item: MenuType;
};

function AddToCartButton({ children, item, ...props }: Props) {
  const { value, setValue } = useShoppingCart();

  const clickHandler = () => {
    const oldItem = value.find((i) => i._id === item._id);

    if (oldItem) {
      setValue(value.map((i) => (i._id === item._id ? { ...i, count: i.count + 1 } : i)));
    } else {
      setValue([...value, { ...item, count: 1 }]);
    }

    toast.success(`"${item.name}" added to Your cart.`);
  };

  return (
    <button
      className='px-4 py-2 bg-yellow-500 rounded-md hover:bg-yellow-700 hover:text-white transition-colors duration-300'
      type='button'
      onClick={clickHandler}
      {...props}
    >
      {children}
    </button>
  );
}

export default AddToCartButton;
