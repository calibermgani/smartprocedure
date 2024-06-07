import { MenuItem } from './menu.model';

export const SIDEMENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'WHITEBOARD',
    icon: 'mdi mdi-clipboard-edit-outline',
    link: 'whiteboard',
  },

  {
    id: 3,
    isLayout: true
  },
  {
    id: 4,
    label: 'PROCEDURE',
    icon: 'mdi mdi-account-circle',
    link: 'procedure',
  },
  // {
  //   id: 5,
  //   label: 'CALENDER',
  //   icon: 'mdi mdi-calendar',
  //   link: 'calender',
  // },
  // {
  //   id: 6,
  //   label: 'CHAT',
  //   icon: 'mdi mdi-send',
  //   link: 'chat',
  // },
  // {
  //   id: 7,
  //   label: 'CHECKLIST',
  //   icon: 'mdi mdi-format-list-checkbox',
  //   link: 'checklist',
  // },
  {
    id: 8,
    label: 'STAFF',
    icon: 'mdi mdi-account-multiple',
    link: 'staff-management',
  },
  {
    id: 9,
    label: 'MATERIAL',
    icon: 'mdi mdi-archive-outline',
    link: 'material-management/dashboard',
  },
  {
    id: 10,
    label: 'SETTINGS',
    icon: 'mdi mdi-cog-outline',
    link: 'settings',
  },
  {
    id: 10,
    label: 'PATIENT list',
    icon: 'mdi mdi-human-child',
    link: 'patient-registration/patient_list',
  },
  {
    id: 12,
    label: 'USERS',
    icon: 'mdi mdi-account-plus',
    link: 'users-list',
  }
];

