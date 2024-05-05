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

export const sideMenu: NavItemWithChildren[] = []
