import { Route } from '@/constants';
import NavigationLink from './NavigationLink';
import NavigationCartLink from './NavigationCartLink';

const links = [{ label: 'Shop', href: Route.SHOP }];

function Navigation() {
  return (
    <nav>
      <ul className='flex gap-4 items-center w-full'>
        {links.map(({ href, label }) => (
          <li key={label}>
            <NavigationLink href={href}>{label}</NavigationLink>
          </li>
        ))}
        <li className='max-md:ml-auto max-md:mr-[10px]'>
          <NavigationCartLink key='Shopping cart' href={Route.SHOPPING_CART}>
            Shopping cart
          </NavigationCartLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
