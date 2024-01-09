import { MenuItem } from './menu.model';

export const MATERIALMANAGEMENTMENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
   {
    id: 2,
    label: 'HOME',
    icon: 'mdi mdi-home',
    link: 'home',
  },
  {
    id: 3,
    isLayout: true
  },
  {
    id: 4,
    label: 'DASHBOARD',
    icon: 'mdi mdi-view-dashboard-outline',
    link: 'material-management/dashboard',
  },
  {
    id: 5,
    label: 'All-ITEMS',
    icon: 'mdi mdi-view-split-vertical',
    link: 'material-management/all-item',
  },

];

