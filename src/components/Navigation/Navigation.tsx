import { Route } from '@/constants';
import NavigationLink from './NavigationLink';
import NavigationCartLink from './NavigationCartLink';

const links = [
  { label: 'Shop', href: Route.SHOP },
  // { label: 'Shopping cart', href: Route.SHOPPING_CART },
];

function Navigation() {
  return (
    <nav>
      <ul className='flex gap-4'>
        {links.map(({ href, label }) => (
          <li key={label}>
            <NavigationLink href={href}>{label}</NavigationLink>
          </li>
        ))}
        <li>
          <NavigationCartLink href={Route.SHOPPING_CART}>Shopping cart</NavigationCartLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
