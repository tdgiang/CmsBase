import React, { useState, useEffect } from 'react'
import {
    Box,
    Container,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Avatar,
    User,
    Typography,
    CardActions,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'
import PickerAvatar from '../../components/Input/PickerAvatar'
import PickerImage from '../../components/Input/PickerImage'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { useHistory, Link } from 'react-router-dom'
import { Breadcrumb, SimpleCard } from 'app/components'
import { trimObject } from 'app/config/Function'
import { toast } from 'react-toastify'
import { apiGetInfor, apiUploadUser } from 'app/apis/Functions/users'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'app/redux/actions/loadingAction'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
const useStyles = makeStyles((theme) => ({
    btn: {
        width: 100,
        color: 'white',
    },
    btnLeft: {
        width: 100,
        color: 'white',
        marginRight: 20,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

const Profile = (props) => {
    const classes = useStyles()
    const [uriImg, setUriImg] = useState('')
    const [data, setData] = useState()
    const [state, setState] = useState({})
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const history = useHistory()
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        props.showLoading()
        const res = await apiGetInfor({})

        props.hideLoading()
        if (res.data.code == 200 && res.data.data) {
            setUriImg(res.data.data.avatar)
            setState(res.data.data)
        } else if (res.data.code == 401) {
            // setTimeout(() => {
            //     history.push('/')
            // }, 1000)
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    const handleSubmit = async (value) => {
        if (value) {
            const newValue = trimObject(state)
            props.showLoading()
            const res = await apiUploadUser({
                ...newValue,
                avatar: uriImg,
            })
            props.hideLoading()
            if (res.data.code == 200) {
                const response = await apiGetInfor({})
                if (response.data.code == 200 && response.data.data) {
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            user: res.data.data,
                        },
                    })
                }
                toast.success('Cập nhật thông tin thành công!', {
                    theme: 'colored',
                })

                history.push('/dashboard')
            } else {
                toast.error(t(res.data.error), {
                    theme: 'colored',
                })
            }
        }
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const onFileChange = (link) => {
        setUriImg(link)
    }
    const { full_name, email, phone, address } = state
    return (
        <div className="m-sm-20">
            <div className="mb-sm-20">
                <Box
                    style={{
                        backgroundColor: 'background.default',
                        minHeight: '100%',
                        paddingTop: '5em',
                        py: 3,
                    }}
                >
                    <Container maxWidth="lg">
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={6} xs={12}>
                                <Card {...props}>
                                    <CardContent>
                                        <Box
                                            style={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <PickerAvatar
                                                onFileChange={onFileChange}
                                                image={uriImg}
                                            />
                                            <Typography variant={'h6'}>
                                                {state.user_group_name}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <Divider />
                                </Card>
                            </Grid>
                            <Grid item lg={8} md={6} xs={12}>
                                <SimpleCard>
                                    <ValidatorForm
                                        onSubmit={handleSubmit}
                                        onError={() => null}
                                    >
                                        <CardContent>
                                            <Grid container spacing={3}>
                                                <Grid item md={6} xs={12}>
                                                    <TextValidator
                                                        variant="outlined"
                                                        className="mb-4 w-full"
                                                        label="Họ và tên *"
                                                        onChange={handleChange}
                                                        type="text"
                                                        name="full_name"
                                                        value={full_name || ''}
                                                        validators={[
                                                            'required',
                                                        ]}
                                                        errorMessages={[
                                                            'Không được để trống trường này',
                                                        ]}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <TextValidator
                                                        variant="outlined"
                                                        className="mb-4 w-full"
                                                        label="Email *"
                                                        onChange={handleChange}
                                                        type="text"
                                                        name="email"
                                                        value={email || ''}
                                                        validators={[
                                                            'required',
                                                            'isEmail',
                                                        ]}
                                                        errorMessages={[
                                                            'Không được để trống trường này',
                                                            'Email không hợp lệ',
                                                        ]}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <TextValidator
                                                        variant="outlined"
                                                        className="mb-4 w-full"
                                                        label="Số điện thoại *"
                                                        onChange={handleChange}
                                                        type="text"
                                                        name="phone"
                                                        value={phone || ''}
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
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <TextValidator
                                                        variant="outlined"
                                                        className="mb-4 w-full"
                                                        label="Địa chỉ"
                                                        onChange={handleChange}
                                                        type="text"
                                                        name="address"
                                                        value={address || ''}
                                                    />
                                                </Grid>
                                                <Grid
                                                    container
                                                    justify={'flex-end'}
                                                    item
                                                    xs={12}
                                                >
                                                    {/* <Link to="/setting">
                                                        <Button
                                                            style={{
                                                                marginRight: 20,
                                                            }}
                                                            color="inherit"
                                                            variant="contained"
                                                        >
                                                            <span className="capitalize">
                                                                Quay lại
                                                            </span>
                                                        </Button>
                                                    </Link> */}
                                                    {/* <Button
                                                        color="primary"
                                                        variant="contained"
                                                        type="submit"
                                                    >
                                                        <span className="capitalize">
                                                            Lưu
                                                        </span>
                                                    </Button> */}
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </ValidatorForm>
                                </SimpleCard>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, { showLoading, hideLoading })(Profile)
