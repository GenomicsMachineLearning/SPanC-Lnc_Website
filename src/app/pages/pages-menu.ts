import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
 
  {
    title: 'About',
    icon: 'home-outline',
    link: '/admin/about',
    home: true,
  },
  {
    title: 'Gene Exploer',
    icon: 'keypad-outline',
    link: '/admin/geneexplorer',
    home: false,
  },
  {
    title: 'Atlas',
    icon: 'shopping-cart-outline',
    link: '/admin/atlas',
    home: false,
  },
 
];
