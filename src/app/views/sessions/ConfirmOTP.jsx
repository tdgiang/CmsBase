import React, { useState } from 'react'
import {
    Card,
    Grid,
    Button,
    Typography,
    CircularProgress,
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { apiConfirmOTP } from 'app/apis/Functions/users'
import history from 'history.js'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import R from 'app/assets/images'
const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        backgroundImage: `url(${R.bg_login})`,
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const ConfirmOTP = () => {
    const [state, setState] = useState({})
    const classes = useStyles()
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation()

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = async (event) => {
        setLoading(true)
        const res = await apiConfirmOTP({
            ...state,
        })
        setLoading(false)
        if (res.data.code == 200) {
            history.push({
                pathname: '/session/new-password',
                state: { phone_number: location.state, otp_code: state.otp_code },
            })
            toast.success('Xác thực OTP thành công!', {
                theme: 'colored',
            })
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    let { otp_code } = state

    return (
        <div
        className={clsx(
            'flex justify-center items-center  min-h-full-screen',
            classes.cardHolder
        )}
        >
            <Card className={classes.card}>
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center items-center h-full">
                        <img className="w-full" src={R.bgConfirmOTP} alt="" />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 mt-10 h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <Typography style={{ marginBottom: 20 }}>
                                    OTP đã được gửi về {location.state}
                                </Typography>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    label="Mã OTP"
                                    onChange={handleChange}
                                    name="otp_code"
                                    size="small"
                                    value={otp_code || ''}
                                    validators={['required']}
                                    errorMessages={[
                                        'Trường này không được để trống!',
                                    ]}
                                />
                                <div className="flex items-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Xác nhận
                                    </Button>
                                    <span className="ml-4 mr-2">or</span>
                                    <Link to="/session/signin">
                                        <Button className="capitalize">
                                            Đăng nhập
                                        </Button>
                                    </Link>
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            className={classes.buttonProgress}
                                        />
                                    )}
                                </div>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default ConfirmOTP
