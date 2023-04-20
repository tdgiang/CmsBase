import React, { useState } from 'react'
import {
    Card,
    Grid,
    Button,
    CircularProgress,
    Typography,
} from '@material-ui/core'
import { Link, NavLink, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { apiGetOTP } from 'app/apis/Functions/users'
import history from 'history.js'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import R from 'app/assets/images'
const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        backgroundImage: `url(${R.bg_login})`,
    },
    cardSetting: {
        height: 250,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 10,
        paddingLeft: 20,
        cursor: 'pointer',
    },
}))
const ForgotPassword = (props) => {
    const [state, setState] = useState({})
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }
    const { t } = useTranslation()

    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 100,
                }}
            >
                <img width={'200'} height="100" src={R.logoMyBond} />
            </div>
            <Grid xs={8} spacing={3} container>
                <Grid item xs={6}>
                    <Card
                        onClick={() => {
                            history.push('/setting/profile')
                            props.updateNavigationByUser()
                        }}
                        className={classes.cardSetting}
                        style={{ backgroundImage: `url(${R.bgSetting})` }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: '#ffffff',
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <img
                                    width={'36'}
                                    height="36"
                                    src={R.icSetting}
                                />
                            </div>

                            <Typography
                                style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#ffff',
                                    marginLeft: 20,
                                }}
                            >
                                Cài đặt chung{' '}
                            </Typography>
                        </div>
                    </Card>
                </Grid>

                <Grid item xs={6}>
                    <Card
                        onClick={() => {
                            history.push('/tcph/dashboard')
                            props.updateNavigationByUser()
                        }}
                        className={classes.cardSetting}
                        style={{ backgroundImage: `url(${R.bgCms})` }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: '#ffffff',
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <img width={'36'} height="36" src={R.icCms} />
                            </div>

                            <Typography
                                style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#ffff',
                                    marginLeft: 20,
                                }}
                            >
                                MyBond CMS
                            </Typography>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card
                        onClick={() => {
                            history.push('/crm/dashboard')
                            props.updateNavigationByUser()
                        }}
                        className={classes.cardSetting}
                        style={{ backgroundImage: `url(${R.bgCRM})` }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: '#ffffff',
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <img width={'36'} height="36" src={R.icCRM} />
                            </div>

                            <Typography
                                style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#ffff',
                                    marginLeft: 20,
                                }}
                            >
                                MyBond CRM
                            </Typography>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default ForgotPassword
