import React from 'react'
import { authRoles } from '../../auth/authRoles'

const MyAccountRoutes = [
    {
        path: '/my-profile',
        component: React.lazy(() => import('./Profile')),
        auth: authRoles.sa,
    },
    {
        path: '/change-password',
        component: React.lazy(() => import('./ChangePassword')),
        auth: authRoles.sa,
    },
]

export default MyAccountRoutes
