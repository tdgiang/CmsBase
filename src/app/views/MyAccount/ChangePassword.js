import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Button, Icon, Grid } from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import 'date-fns'
import { Breadcrumb, SimpleCard } from 'app/components'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'app/redux/actions/loadingAction'
import { toast } from 'react-toastify'
import { apiChangePass } from 'app/apis/Functions/users'
import { trimObject } from 'app/config/Function'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const SimpleForm = (props) => {
    const [state, setState] = useState({})
    const history = useHistory()
    const { t } = useTranslation()
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.new_password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.new_password])

    const handleSubmit = async (event) => {
        const newValue = trimObject(state)
        props.showLoading()
        const res = await apiChangePass({
            ...newValue,
        })
        props.hideLoading()
        if (res.data.code == 200) {
            history.push('/dashboard')
            if (res.data.code == 200) {
                toast.success('Đổi mật khẩu thành công!', {
                    theme: 'colored',
                })
            }
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange = (date) => {
        setState({ ...state, date })
    }

    const { old_password, new_password, repeatPassword } = state

    return (
        <div className="m-sm-20">
            <div className="mb-sm-20">
                <SimpleCard>
                    <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    className="mb-4 w-full"
                                    label="Mật khẩu cũ *"
                                    onChange={handleChange}
                                    type="password"
                                    name="old_password"
                                    value={old_password || ''}
                                    validators={['required']}
                                    errorMessages={[
                                        'Không được để trống trường này',
                                    ]}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                            </Grid>
                        </Grid>
                        <Grid
                            xs={12}
                            className="mb-5"
                            container
                            justify={'flex-end'}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                <span className="capitalize">Cập nhật</span>
                            </Button>
                        </Grid>
                    </ValidatorForm>
                </SimpleCard>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, { showLoading, hideLoading })(
    SimpleForm
)
