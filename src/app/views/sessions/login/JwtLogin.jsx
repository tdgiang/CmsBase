import React, { useState } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    CircularProgress,
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { getNavigationByUser } from 'app/redux/actions/NavigationAction'
import { makeStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import R from 'app/assets/images'
import './style.css'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        backgroundImage: `url(${R.bg_login})`,
    },
    card: {
        maxWidth: 850,
        borderRadius: 12,
        margin: '1rem',
        padding: 20,
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const JwtLogin = () => {
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })
    const [message, setMessage] = useState('')
    const { login } = useAuth()

    const classes = useStyles()

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
            const res= await login(userInfo.email, userInfo.password)
            console.log("res",res)
            if(res){
                history.push('/')
            } 
            setLoading(false)
           
        } catch (e) {
            setMessage(e.message)
            setLoading(false)
        }
    }

    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            handleFormSubmit()
        }
    }

    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <Card className={classes.card}>
                <Grid container>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <div className="p-10 flex justify-center items-center h-full">
                            <img className="w-200" src={R.login} alt="" />
                        </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                        <div
                            style={{
                                fontSize: 30,
                                fontWeight: 700,
                                marginLeft: 50,
                            }}
                        >
                            Đăng nhập
                            
                        </div>
                        <div className="p-8 h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Tài khoản"
                                    onChange={handleChange}
                                    name="email"
                                    value={userInfo.email}
                                    validators={['required']}
                                    errorMessages={[
                                        'Trường này không được để trống!',
                                    ]}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    label="Mật khẩu"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    onKeyPress={handleKeypress}
                                    name="password"
                                    type="password"
                                    value={userInfo.password}
                                    validators={['required']}
                                    errorMessages={[
                                        'Trường này không được để trống!',
                                    ]}
                                />

                                {message && (
                                    <p className="text-error">{message}</p>
                                )}

                                <div className="flex flex-wrap items-center mb-4 w-full">
                                    <div className="relative">
                                        <Button
                                            variant="contained"
                                            disabled={loading}
                                            type="submit"
                                            className="btn_primary"
                                            style={{
                                                backgroundColor:
                                                    '#47AB48 !important',
                                            }}
                                        >
                                            Đăng nhập
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                                <Button
                                    onClick={() =>
                                        history.push('/session/forgot-password')
                                    }
                                    style={{
                                        color: '#006F91',
                                        textAlign: 'right',
                                    }}
                                >
                                    Quên mật khẩu?
                                </Button>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
            {/* <div>
                <img src={R.logo} className="logoLogin" />
            </div> */}
        </div>
    )
}

export default JwtLogin
