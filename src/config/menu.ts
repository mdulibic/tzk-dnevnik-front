import { Icons } from "@/components/icons.tsx"

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
        title: 'Planer',
        to: '',
    },
    {
        title: 'Razredi',
        to: '/students',
    },
    {
        title: 'Moj Profil',
        to: '/profile',
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
]

export const sideMenu: NavItemWithChildren[] = []
