import React from 'react'
import {
    Icon,
    IconButton,
    MenuItem,
    Avatar,
    useMediaQuery,
    Hidden,
} from '@material-ui/core'
import { MatxMenu, MatxSearchBox } from 'app/components'
import NotificationBar from '../../NotificationBar/NotificationBar'
import { Link } from 'react-router-dom'
// import ShoppingCart from '../../ShoppingCart/ShoppingCart'
import { useLocation } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import { NotificationProvider } from 'app/contexts/NotificationContext'
import { Breadcrumb } from 'app/components'


const useStyles = makeStyles(({ palette, ...theme }) => ({
    topbar: {
        top: 0,
        zIndex: 96,
        transition: 'all 0.3s ease',
        background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',

        '& .topbar-hold': {
            backgroundColor: palette.primary.main,
            height: 80,
            paddingLeft: 18,
            paddingRight: 20,
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 16,
                paddingRight: 16,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 14,
                paddingRight: 16,
            },
        },
        '& .fixed': {
            boxShadow: theme.shadows[8],
            height: 64,
        },
    },
    userMenu: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 24,
        padding: 4,
        '& span': {
            margin: '0 8px',
            // color: palette.text.secondary
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 185,
    },
}))

const Layout1Topbar = () => {
    const theme = useTheme()
    const classes = useStyles()
    const { settings, updateSettings } = useSettings()
    const location = useLocation();
    const { logout, user } = useAuth()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const fixed = settings?.layout1Settings?.topbar?.fixed

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode

        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'close'
                    ? 'mobile'
                    : 'close'
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        }

        updateSidebarMode({ mode })
    }

    return (
        <div className={classes.topbar}>
            <div className={clsx({ 'topbar-hold': true, fixed: fixed })}>
                <div className="flex justify-between items-center h-full">
                    <div className="flex">
                        <IconButton
                            onClick={handleSidebarToggle}
                            className="hide-on-pc"
                        >
                            <Icon>menu</Icon>
                        </IconButton>

                        <div className="hide-on-mobile">
                        <Breadcrumb
                        routeSegments={[
                            {
                                name: 'Dashboard',
                                path: '/dashboard',
                            },
                            { name: location.pathname },
                        ]}
                    />
                        </div>
                    </div>
                    <div className="flex items-center">
                       
                        <NotificationProvider>
                            <NotificationBar />
                        </NotificationProvider>

                        <MatxMenu
                            menuButton={
                                <div className={classes.userMenu}>
                                    <Hidden xsDown>
                                        <span>
                                            Hi <strong>{user.full_name}</strong>
                                        </span>
                                    </Hidden>
                                    <Avatar
                                        className="cursor-pointer"
                                        src={user.avatar}
                                    />
                                </div>
                            }
                        >
                            <MenuItem>
                                <Link
                                    className={classes.menuItem}
                                    to="/my-profile"
                                >
                                    <Icon> person </Icon>
                                    <span className="pl-4"> Tài khoản </span>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                  <Link
                                    className={classes.menuItem}
                                    to="/change-password"
                                >
                                    <Icon> settings </Icon>
                                <span className="pl-4">Đổi mật khẩu</span>
                                </Link>
                            </MenuItem>
                            <MenuItem
                                onClick={logout}
                                className={classes.menuItem}
                            >
                                <Icon color={'error'} > power_settings_new </Icon>
                                <span className="pl-4"> Đăng xuất </span>
                            </MenuItem>
                        </MatxMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Layout1Topbar)
