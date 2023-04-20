import React, { useEffect, useState } from 'react'
// import './Employee.scss';
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    Typography,
    Card,
    Switch,
    MenuItem,
} from '@material-ui/core'
import {
    getDropDownGroup,
    dropdownOrganization,
    dropdownUserTCPH,
} from 'app/apis/Functions/dropdown'
import { Breadcrumb, SimpleCard } from 'app/components'
import { convertDate, trimObject, convertTimeApi } from 'app/config/Function'
import useAuth from 'app/hooks/useAuth'
import { hideLoading, showLoading } from 'app/redux/actions/loadingAction'
import { useTranslation } from 'react-i18next'
import {
    TextValidator,
    ValidatorForm,
    SelectValidator,
} from 'react-material-ui-form-validator'
import {
    updateEmployee,
    detailEmployee,
} from 'app/apis/Functions/Setting/Employee'
import { connect } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import PickerAvatar from 'app/components/Input/PickerAvatar'
import {
    InputDateField,
    InputTextField,
    SelectInputField,
} from 'app/components/CustomInput'

import { TYPE_INPUT } from 'app/utils'

function CreateDeparment(props) {
    const { user } = useAuth()
    const location = useLocation()
    const history = useHistory()
    const [state, setState] = useState({})
    const [image, setImage] = useState()
    const [birdth, setBirdth] = useState(new Date())
    const [listGroup, setListGroup] = useState([])

    const [listGender, setListGender] = useState([
        { id: 15, value: 15, name: 'Nam' },
        { id: 16, value: 16, name: 'Nữ' },
    ])
    const [listUserGroup, setListUserGroup] = useState([])
    const [lisOrganization, setLisOrganization] = useState([])

    const { t } = useTranslation()
    useEffect(() => {
        getData()
        getListUserGroup()
        getListOrganization()
        getDataDetail()
    }, [])

    const getDataDetail = async () => {
        props.showLoading()
        const res = await detailEmployee(location.state, {})
        props.hideLoading()
        if (res.data.code == 200 && res.data.data) {
            const data = res.data.data
            setState(data)
            if (data.avatar) setImage(data.avatar)
            setBirdth(convertTimeApi(data.birth_date))
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    const getData = async () => {
        props.showLoading()
        const res = await getDropDownGroup({})
        props.hideLoading()
        if (res.data.code == 200 && res.data.data) {
            const temp = res.data.data.map((e) => {
                return { ...e, value: e.id }
            })
            setListGroup(temp)
        } else {
            setListGroup([])
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }
    const getListUserGroup = async () => {
        props.showLoading()
        const res = await dropdownUserTCPH({})
        props.hideLoading()
        if (res.data.code == 200 && res.data.data) {
            const temp = res.data.data.map((e) => {
                return { ...e, value: e.id, name: e.full_name }
            })
            setListUserGroup(temp)
        } else {
            setListGroup([])
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }
    const getListOrganization = async () => {
        props.showLoading()
        const res = await dropdownOrganization({})
        props.hideLoading()
        if (res.data.code == 200 && res.data.data) {
            const temp = res.data.data.map((e) => {
                return { ...e, value: e.id }
            })
            setLisOrganization(temp)
        } else {
            setListGroup([])
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    const handleSubmit = async (value) => {
        if (state) {
            const newValue = trimObject(state)
            props.showLoading()
            const res = await updateEmployee({
                ...newValue,
                birth_date: convertDate(birdth),
                avatar: image,
                status: 1,
            })
            props.hideLoading()
            if (res.data.code == 200) {
                history.push('/setting/user')
                toast.success('Cập nhật Người dùng thành công!', {
                    theme: 'colored',
                })
            } else {
                toast.error(t(res.data.error), {
                    theme: 'colored',
                })
            }
        }
    }

    const onFileChange = (link) => {
        setImage(link)
    }

    const handleDateChangeLast = (date) => {
        setBirdth(date)
    }

    const handleChange = (event) => {
        // event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const {
        username,
        password,
        phone,
        email,
        address,
        user_group_id,
        full_name,
        organization_id,
        presentive_id,
        gender_id,
        position,
    } = state

    return (
        <div className="m-sm-20">
            <div className="mb-sm-20">
                <div className="mb-sm-20"></div>

                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    {state && (
                        <Grid
                            container
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            spacing={2}
                        >
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <SimpleCard>
                                    <Grid
                                        container
                                        lg={12}
                                        md={12}
                                        justify="center"
                                        sm={12}
                                        xs={12}
                                        spacing={2}
                                        style={{ marginTop: 10 }}
                                    >
                                        <PickerAvatar
                                            onFileChange={onFileChange}
                                            image={image}
                                        />
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <Typography
                                                style={{
                                                    textAlign: 'center',
                                                    marginTop: 20,
                                                    marginBottom: 20,
                                                    color: 'var(--color-primary)',
                                                    fontWeight: 700,
                                                    fontSize: 16,
                                                }}
                                            >
                                                Thông tin tài khoản
                                            </Typography>
                                        </Grid>

                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            {username && (
                                                <TextValidator
                                                    variant="outlined"
                                                    className="mb-4 w-full"
                                                    label="Tên đăng nhập *"
                                                    disabled
                                                    value={username}
                                                    name="username"
                                                    title={'Tên đăng nhập'}
                                                />
                                            )}
                                        </Grid>
                                        {/* <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextValidator
                                                variant="outlined"
                                                className="mb-4 w-full"
                                                label="Mật khẩu *"
                                                disabled
                                                onChange={handleChange}
                                                type="password"
                                                name="password"
                                                value={password || ''}
                                                validators={[
                                                    'required',
                                                    'minStringLength:8',
                                                ]}
                                                errorMessages={[
                                                    'Không được để trống trường này',
                                                    'Mật khẩu phải có ít nhất 8 ký tự',
                                                ]}
                                            />
                                        </Grid> */}

                                        <Grid
                                            className="mb-6"
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <SelectValidator
                                                variant={'outlined'}
                                                label={'Vai trò *'}
                                                className="w-full"
                                                displayEmpty
                                                validators={['required']}
                                                onChange={handleChange}
                                                errorMessages={[
                                                    'Không được để trống trường này',
                                                ]}
                                                value={user_group_id || ''}
                                                name="user_group_id"
                                            >
                                                {listGroup.map((e) => (
                                                    <MenuItem value={e.id}>
                                                        {e.name}
                                                    </MenuItem>
                                                ))}
                                            </SelectValidator>
                                        </Grid>
                                    </Grid>
                                </SimpleCard>
                            </Grid>
                            <Grid item lg={8} md={8} sm={8} xs={8}>
                                <SimpleCard>
                                    <Grid
                                        container
                                        spacing={2}
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                    >
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <Typography
                                                style={{
                                                    color: 'var(--color-primary)',
                                                    fontWeight: 700,
                                                    fontSize: 16,
                                                }}
                                            >
                                                Thông tin cá nhân
                                            </Typography>
                                        </Grid>

                                        <InputTextField
                                            value={full_name}
                                            name="full_name"
                                            title={'Tên Người dùng'}
                                            typeInput={TYPE_INPUT.TEXT}
                                            isRequired={true}
                                            handleChange={handleChange}
                                        />

                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <SelectValidator
                                                variant={'outlined'}
                                                label={'Giới tính *'}
                                                className="w-full"
                                                onChange={handleChange}
                                                displayEmpty
                                                validators={['required']}
                                                errorMessages={[
                                                    'Không được để trống trường này',
                                                ]}
                                                value={gender_id || ''}
                                                name="gender_id"
                                            >
                                                {listGender.map((e) => (
                                                    <MenuItem value={e.id}>
                                                        {e.name}
                                                    </MenuItem>
                                                ))}
                                            </SelectValidator>
                                        </Grid>

                                        <InputTextField
                                            value={phone}
                                            name="phone"
                                            title={'Số điện thoại'}
                                            typeInput={TYPE_INPUT.TEXT}
                                            isRequired={true}
                                            handleChange={handleChange}
                                        />
                                        <InputTextField
                                            value={email}
                                            name="email"
                                            title={'Email'}
                                            typeInput={TYPE_INPUT.EMAIL}
                                            isRequired={true}
                                            handleChange={handleChange}
                                        />

                                        <InputDateField
                                            date={birdth}
                                            title={'Ngày sinh'}
                                            handleDateChange={
                                                handleDateChangeLast
                                            }
                                        />

                                        <InputTextField
                                            value={address}
                                            name="address"
                                            title={'Địa chỉ'}
                                            typeInput={TYPE_INPUT.TEXT}
                                            isRequired={true}
                                            handleChange={handleChange}
                                        />

                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <SelectValidator
                                                variant={'outlined'}
                                                label={'Trực thuộc đơn vị *'}
                                                className="w-full"
                                                displayEmpty
                                                onChange={handleChange}
                                                validators={['required']}
                                                errorMessages={[
                                                    'Không được để trống trường này',
                                                ]}
                                                value={organization_id || ''}
                                                name="organization_id"
                                            >
                                                {lisOrganization.map((e) => (
                                                    <MenuItem value={e.id}>
                                                        {e.name}
                                                    </MenuItem>
                                                ))}
                                            </SelectValidator>
                                        </Grid>

                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                            className="mb-4"
                                        >
                                            <SelectValidator
                                                variant={'outlined'}
                                                label={'Quản lý trực tiếp *'}
                                                className="w-full"
                                                displayEmpty
                                                onChange={handleChange}
                                                validators={['required']}
                                                errorMessages={[
                                                    'Không được để trống trường này',
                                                ]}
                                                value={presentive_id || ''}
                                                name="presentive_id"
                                            >
                                                {listUserGroup.map((e) => (
                                                    <MenuItem value={e.id}>
                                                        {e.name}
                                                    </MenuItem>
                                                ))}
                                            </SelectValidator>
                                        </Grid>

                                        <InputTextField
                                            variant="outlined"
                                            className="mb-4 w-full"
                                            title={'Chức danh *'}
                                            handleChange={handleChange}
                                            value={position}
                                            name="position"
                                            validators={['required']}
                                            errorMessages={[
                                                'Không được để trống trường này',
                                            ]}
                                        />
                                    </Grid>
                                </SimpleCard>
                            </Grid>
                        </Grid>
                    )}

                    <Grid className="px-4 my-4" container justify={'flex-end'}>
                        <Link to="/setting/user">
                            <Button
                                variant="outlined"
                                style={{
                                    marginRight: 20,
                                }}
                                className="btn_Cancel"
                            >
                                Huỷ bỏ
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            className="btn_primary"
                            type="submit"
                        >
                            Cập nhật
                        </Button>
                    </Grid>
                </ValidatorForm>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, { showLoading, hideLoading })(
    CreateDeparment
)
