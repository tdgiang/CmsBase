import React, { useState, useEffect } from 'react'
import { Card, Grid, Button, CircularProgress } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { apiConfirmPass } from 'app/apis/Functions/users'
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
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation()
    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.new_password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.new_password])

    const handleFormSubmit = async (event) => {
        const res = await apiConfirmPass({
            otp_code: location.state.otp_code,
            phone_number: location.state.phone_number,
            new_password: state.new_password,
        })
        if (res.data.code == 200) {
            toast.success('Lấy lại mật khẩu thành công!', {
                theme: 'colored',
            })
            history.push({
                pathname: '/session/signin',
            })
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    let { new_password, repeatPassword } = state

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
                        <img className="w-full" src={R.bgResertPass} alt="" />
                           
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 mt-10  h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    variant="outlined"
                                    className="mb-4 w-full"
                                    label="Mật khẩu mới *"
                                    onChange={handleChange}
                                    type="password"
                                    name="new_password"
                                    value={new_password || ''}
                                    validators={[
                                        'required',
                                        'minStringLength:8',
                                    ]}
                                    errorMessages={[
                                        'Không được để trống trường này',
                                        'Mật khẩu phải có ít nhất 8 ký tự',
                                    ]}
                                />

                                <TextValidator
                                    variant="outlined"
                                    className="mb-4 w-full"
                                    label="Nhập lại mật khẩu *"
                                    onChange={handleChange}
                                    name="repeatPassword"
                                    type="password"
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={[
                                        'Mật khẩu không trùng nhau',
                                        'Không được để trống trường này',
                                    ]}
                                    value={repeatPassword}
                                />
                                <div className="flex items-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Đổi lại mật khẩu
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

export default ForgotPassword
