import { convertNumberToMoney } from '@/helpers';
import { useShoppingCart } from '@/hooks';
import { CartProductType } from '@/types';
import Image from 'next/image';
import React, { ChangeEvent, useCallback } from 'react';
import { toast } from 'react-toastify';

type Props = {
  item: CartProductType;
};

function ShoppingCardProduct({ item }: Props) {
  const { _id, count, imageUrl, price, name } = item;
  const { value, setValue } = useShoppingCart();

  const changeCount = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const count = Number(evt.target.value);

      if (isNaN(count)) return;

      setValue(value.map((p) => (p._id === _id ? { ...p, count } : p)));
    },
    [_id, setValue, value]
  );

  const removeHandler = useCallback(() => {
    setValue(value.filter((p) => p._id !== _id));
    toast.success(`"${item.name}" deleted from Your cart`);
  }, [_id, setValue, value]);

  return (
    <section className='relative flex gap-4 items-center p-2 text-xs bg-gray-100 rounded-md'>
      <button
        className='absolute top-3 right-3 px-2 py-1 text-[16px]/[1] bg-gray-200 rounded-full hover:bg-gray-50'
        type='button'
        onClick={removeHandler}
      >
        x
      </button>
      <div className='flex items-center w-[100px] aspect-square bg-gray-300 rounded-md overflow-hidden'>
        <Image className='w-full h-auto' src={imageUrl} width={100} height={100} alt={name} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>{name}</p>
        <p className='font-bold'>Price: {convertNumberToMoney(price)}</p>
        <input className='p-1' type='number' min={1} value={count} onChange={changeCount} />
      </div>
    </section>
  );
}

export default ShoppingCardProduct;
