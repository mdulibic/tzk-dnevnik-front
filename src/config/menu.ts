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

export const teacherMenu: NavItemWithChildren[] = [
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
        title: 'Uvoz korisnika',
        to: '/admin/import',
    },
]

export const studentMenu: NavItemWithChildren[] = [
    {
        title: 'Raspored',
        to: '/student',
    },
    {
        title: 'Profil',
        to: '/student/profile',
    },
]

export const sideMenu: NavItemWithChildren[] = []
