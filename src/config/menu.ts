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
        to: '/teacher',
    },
    {
        title: 'Razredi',
        to: '/teacher/students',
    },
    {
        title: 'Postavke',
        to: '/teacher/settings',
    },
]

export const adminMenu: NavItemWithChildren[] = [
    {
        title: 'Registracija',
        to: '/admin/registration',
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
        title: 'Postavke',
        to: '/admin/settings',
    },
]

export const studentMenu: NavItemWithChildren[] = [
    {
        title: 'Raspored',
        to: '/student/schedule',
    },
    {
        title: 'Profil',
        to: '/student/profile',
    },
]

export const sideMenu: NavItemWithChildren[] = []
