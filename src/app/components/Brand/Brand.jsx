import React from 'react'
import { MatxLogo } from 'app/components'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import useSettings from 'app/hooks/useSettings'
import images from '../../assets/images'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    brand: {
        padding: '20px',
    },
    hideOnCompact: {
        display: 'none',
    },
}))

const Brand = ({ children }) => {
    const classes = useStyles()
    const { settings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode } = leftSidebar

    // return null

    return (
        <div
            className={clsx('flex items-center justify-around', classes.brand)}
        >
            <Link to={'/'}>
                <div className="flex items-center">
                    <img width="75" height="60"
                         src={images.logo}
                    />
                </div>
            </Link>
            <div
                className={clsx({
                    sidenavHoverShow: true,
                    [classes.hideOnCompact]: mode === 'compact',
                })}
            >
                {children || null}
            </div>
        </div>
    )
}

export default Brand
