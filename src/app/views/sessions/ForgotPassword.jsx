import React, { useState } from 'react'
import { Card, Grid, Button, CircularProgress } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'
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
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const ForgotPassword = () => {
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
    const handleFormSubmit = async (event) => {
        setLoading(true)
        const res = await apiGetOTP({
            ...state,
        })
        setLoading(false)
        if (res.data.code == 200) {
            toast.success(`OTP đã được gửi về ${state.phone_number} của bạn!`, {
                theme: 'colored',
            })
            history.push({
                pathname: '/session/confirm-otp',
                state: state.phone_number,
            })
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    let { phone_number } = state

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
                        <div className="flex justify-center items-center h-full">
                            <img className="w-full" src={R.loss_pass} alt="" />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                    <div className="p-8 mt-20  h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    variant="outlined"
                                    className="mb-4 w-full"
                                    label="Số điện thoại *"
                                    onChange={handleChange}
                                    type="text"
                                    name="phone_number"
                                    value={phone_number || ''}
                                    validators={[
                                        'required',
                                        'isNumber',
                                        'minStringLength:10',
                                        'maxStringLength:15',
                                    ]}
                                    errorMessages={[
                                        'Không được để trống trường này',
                                        'Trường này phải nhập số ',
                                        'Số điện thoại phải có ít nhất 10 chữ số',
                                        'Số điện thoại nhiều nhất chỉ có 15 chữ số',
                                    ]}
                                />
                                <div className="flex items-center">
                                    <Button
                                        variant="contained"
                                        className="btn_primary"
                                        disabled={loading}
                                        type="submit"
                                    >
                                        Lấy OTP
                                    </Button>
                                    <span className="ml-4 mr-2">or</span>
                                    <Link to="/session/signin">
                                        <Button className="capitalize">
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
                                    </Link>
                                </div>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default ForgotPassword
