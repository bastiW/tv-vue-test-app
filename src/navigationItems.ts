declare type Lazy<T> = () => Promise<T>;

import {RouteComponent} from 'vue-router'

export type NavigationItem = {
    name: string,
    label: string,
    iconClass?: string,
    bottom?: boolean,
    path: string,
    showSubMenuWhileContentIsActive?: boolean,
    component: RouteComponent | Lazy<RouteComponent>,
    navigationChildren?: {
        name: string,
        label: string,
        iconClass?: string,
        bottom?: boolean,
        path: string,
        showSubMenuWhileContentIsActive?: boolean,
        component: RouteComponent | Lazy<RouteComponent>,
        navigationChildren?: {
            name: string,
            label: string,
            iconClass?: string,
            bottom?: boolean,
            path: string,
            showSubMenuWhileContentIsActive?: boolean,
            component: RouteComponent | Lazy<RouteComponent>,
        }[]
    }[]
}

export const navigationItems: NavigationItem[] = [
    {
        name: 'Page1',
        path: '/',
        component: () => import("@/views/Page1.vue"),
        label: 'Menu 1',
        iconClass: 'bx bx-table',
    },
    {
        path: '/page2',
        name: 'Page2',
        component: () => import("@/views/Page2.vue"),
        label: 'Menu 2',
        iconClass: 'bx bx-trophy',
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import("@/views/Contact.vue"),
        label: 'Settings',
        iconClass: 'bx bx-cog',
        bottom: true,
        showSubMenuWhileContentIsActive: true,
        navigationChildren: [
            {
                path: "/contact",
                name: "Contact",
                component: () => import("@/views/Contact.vue"),
                label: 'Contact',
            },
            {
                path: "/privacy-agreement",
                name: "PrivacyAgreement",
                component: () => import("@/views/PrivacyAgreement.vue"),
                label: 'Privacy Agreement',
            },
        ]
    }
]

