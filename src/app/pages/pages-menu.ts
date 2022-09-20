import { SideMenuOption } from '../components/side-menu/models/side-menu-option';

export const GUEST_MENU_ITEMS: SideMenuOption[] = [
  {
    displayText: 'Dashboard',
    iconName: 'home-outline',
    url: '/pages/dashboard/iot',
    expanded: false,
    hasChild: false,
  },
];

export const FACTORY_MENU_ITEMS: SideMenuOption[] = [
  {
    displayText: 'Dashboard',
    iconName: 'home-outline',
    url: '/pages/dashboard/iot',
    expanded: false,
    hasChild: false,
  },
  {
    displayText: 'Factory',
    iconName: 'archive-outline',
    expanded: false,
    hasChild: false,
    subOptions: [
      {
        displayText: 'Counter',
        iconName: 'battery-outline',
        url: '/pages/factory/counters',
      },
    ],
  },
];

export const MENU_ITEMS: SideMenuOption[] = [
  {
    displayText: 'Dashboard',
    iconName: 'home-outline',
    url: '/pages/dashboard/iot',
    expanded: false,
    hasChild: false,
  },
  {
    displayText: 'Admin',
    iconName: 'award-outline',
    expanded: false,
    hasChild: false,
    subOptions: [
      {
        displayText: 'Users',
        iconName: 'people-outline',
        url: '/pages/admin/users',
      },
      {
        displayText: 'Tenants',
        iconName: 'globe-outline',
        url: '/pages/admin/tenants',
      },
      {
        displayText: 'Terminals',
        iconName: 'tv-outline',
        url: '/pages/admin/terminals',
      },
      {
        displayText: 'Counter',
        iconName: 'battery-outline',
        url: '/pages/admin/counters',
      },
    ],
  },
  {
    displayText: 'Factory',
    iconName: 'archive-outline',
    expanded: false,
    hasChild: false,
    subOptions: [
      {
        displayText: 'Counter',
        iconName: 'battery-outline',
        url: '/pages/factory/counters',
      },
    ],
  },
];
