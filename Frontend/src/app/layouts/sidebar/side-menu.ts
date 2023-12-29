import { MenuItem } from './menu.model';

export const SIDEMENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.HOME.TEXT',
        icon: 'mdi mdi-home',
        link: 'dashboards',
        // subItems: [
        //     {
        //         id: 3,
        //         label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
        //         link: '/',
        //         parentId: 2
        //     },
        //     {
        //         id: 4,
        //         label: 'MENUITEMS.DASHBOARDS.LIST.SAAS',
        //         link: '/',
        //         parentId: 2
        //     },
        //     {
        //         id: 5,
        //         label: 'MENUITEMS.DASHBOARDS.LIST.CRYPTO',
        //         link: '/',
        //         parentId: 2
        //     },
        //     {
        //         id: 6,
        //         label: 'MENUITEMS.DASHBOARDS.LIST.BLOG',
        //         link: '/',
        //         parentId: 2
        //     },
        //     {
        //         id: 7,
        //         label: 'MENUITEMS.DASHBOARDS.LIST.JOBS',
        //         link: '/',
        //         parentId: 2,
        //     },
        // ]
    },
    {
        id: 3,
        isLayout: true
    },
    {
        id: 4,
        label: 'MENUITEMS.WHITEBOARD.TEXT',
        icon: 'mdi mdi-clipboard-edit-outline',
        link: 'whiteboard',
    },
    {
        id: 5,
        label: 'MENUITEMS.Procedure.TEXT',
        icon: 'mdi mdi-account-circle',
        link: 'procedure',
    },
    {
    id: 6,
    label: 'MENUITEMS.CALENDAR.TEXT',
    icon: 'mdi mdi-calendar',
    link: 'calender',
    },
    {
        id: 7,
        label: 'MENUITEMS.CHAT.TEXT',
        icon: 'mdi mdi-send',
        link: 'chat',
    },
    // {
    //     id: 22,
    //     label: 'MENUITEMS.PROCEDURE.TEXT',
    //     icon: 'mdi mdi-baby',
    // },
    {
        id: 8,
        label: 'MENUITEMS.CHECKLIST.TEXT',
        icon: 'mdi mdi-format-list-checkbox',
        link: '/checklist',
    },
    {
        id: 9,
        label: 'MENUITEMS.SETTINGS.TEXT',
        icon: 'mdi mdi-cog-outline',
        link: '/settings',
    }
];

