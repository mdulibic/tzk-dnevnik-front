import { Icons } from "@/components/shared/icons/icons.tsx"

interface NavItem {
    title: string
    to?: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
}

interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export const mainMenu: NavItemWithChildren[] = [
    {
        title: 'Raspored',
        to: '',
    },
    {
        title: 'Razredi',
        to: '/students',
    },
    {
        title: 'Postavke',
        to: '/settings',
    },
]

export const adminMenu: NavItemWithChildren[] = [
    {
        title: 'Registracija',
        to: '/admin',
    },
    {
        title: 'Učenici',
        to: '/admin/students',
    },
    {
        title: 'Nastavnici',
        to: '/admin/teachers',
    },
    {
        title: 'Uvoz podataka',
        to: '/admin/import',
    },
]

export const sideMenu: NavItemWithChildren[] = []
