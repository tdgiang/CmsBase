import React, { useState, useEffect } from 'react'
import DashboardView from './view'
import { updateNavigationByUser } from 'app/redux/actions/NavigationAction'
import { connect } from 'react-redux'
import useAuth from 'app/hooks/useAuth'
import { Redirect, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import localStorageService from 'app/services/localStorageService'
import KEY from 'app/assets/Key'

const getUserRoleAuthStatus = (pathname, user) => {
    const token = localStorageService.getItem(KEY.API_TOKEN)

    if (user && token) {
        return true
        // if(user.is_sysadmin){
        //   return true
        // }else{
        //   let flag=false;
        //   console.log("listPath",user.listPath)
        //   console.log("Path",pathname)
        //   user.listPath.map(e=>{
        //     if(e==pathname || pathname==='/dashboard/default' || pathname==='/'  || pathname=="/dashboard" || pathname=="/my-profile" || pathname=="/change-password" )
        //       flag=true

        //   })
        //   return flag
        // }
    }

    return false
}

const RootDashboard = (props) => {
    const history = useHistory()

    const { isAuthenticated, user } = useAuth()

    const [previouseRoute, setPreviousRoute] = useState(null)
    const { pathname } = useLocation()

    const isUserRoleAuthenticated = getUserRoleAuthStatus(pathname, user)
    let authenticated = isAuthenticated && isUserRoleAuthenticated

    console.log('authenticated', authenticated)

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])
    if (authenticated)
        return (
            <DashboardView
                updateNavigationByUser={props.updateNavigationByUser}
            />
        )
    else {
        return (
            <Redirect
                to={{
                    pathname: '/session/signin',
                    state: { redirectUrl: previouseRoute },
                }}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, { updateNavigationByUser })(
    RootDashboard
)
