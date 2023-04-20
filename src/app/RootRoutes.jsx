import React from 'react'
import { Redirect } from 'react-router-dom'
 
import dashboardRoutes from './views/dashboard/DashboardRoutes'
 
 
import SettingDashboard from './views/Setting/Routes'
 
import MyAccountRouters from './views/MyAccount/MyAccountRoutes'
const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...MyAccountRouters,
    ...SettingDashboard,
    ...dashboardRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
