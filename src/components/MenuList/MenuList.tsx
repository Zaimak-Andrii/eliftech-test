import MenuItem from './MenuItem';
import { MenuType } from '@/types';

type Props = {
  list: MenuType[];
};

function MenuList({ list }: Props) {
  return (
    <>
      {list.length > 0 ? (
        <ul className='flex flex-col md:flex-row flex-wrap gap-3 w-[calc(100%+16px*2)] overflow-y-auto -mx-4 px-4'>
          {list.map((item) => (
            <li key={item._id} className='w-full md:w-[calc((100%-12px)/2)] xl:md:w-[calc((100%-2*12px)/3)] h-fit'>
              <MenuItem item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No products</p>
      )}
    </>
  );
}

export default MenuList;
