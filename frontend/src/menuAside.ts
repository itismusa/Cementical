import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/equipment/equipment-list',
    label: 'Equipment',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTools' in icon ? icon['mdiTools' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_EQUIPMENT'
  },
  {
    href: '/jobs/jobs-list',
    label: 'Jobs',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiBriefcase' in icon ? icon['mdiBriefcase' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_JOBS'
  },
  {
    href: '/materials/materials-list',
    label: 'Materials',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiPackageVariant' in icon ? icon['mdiPackageVariant' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_MATERIALS'
  },
  {
    href: '/reports/reports-list',
    label: 'Reports',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFileDocument' in icon ? icon['mdiFileDocument' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_REPORTS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
