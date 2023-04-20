import React from 'react'

const SettingRoutes = [
    {
        path: '/setting/user/create',
        component: React.lazy(() => import('./User/Create')),
    },
    {
        path: '/setting/user/update',
        component: React.lazy(() => import('./User/Update')),
    },
    {
        path: '/setting/user',
        component: React.lazy(() => import('./User/Index')),
    },
]

export default SettingRoutes
