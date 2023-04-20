import React, { useState, useEffect } from 'react'
import {
    ValidatorForm,
    TextValidator,
    SelectValidator,
} from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Typography,
    MenuItem,
} from '@material-ui/core'
import { showLoading, hideLoading } from 'app/redux/actions/loadingAction'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
    dropdownGetINation,
    dropdownGetIProvince,
    dropdownGetIProvinceBy,
} from 'app/apis/Functions/dropdown'

const ProvinceSelect = (props) => {
    const { nation_id, province_id, district_id, ward_id, handleChange } = props
    const [nation, setNation] = useState()
    const [province, setProvince] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    const history = useHistory()
    const { t } = useTranslation()
    useEffect(() => {
        getDataNation()
        getDataProvince()
    }, [])

    useEffect(() => {
        if (province_id) {
            getDataDistrict()
        }
    }, [province_id])

    useEffect(() => {
        if (district_id) {
            getDataWard()
        }
    }, [district_id])

    const getDataNation = async () => {
        props.showLoading()
        const res = await dropdownGetINation({})
        props.hideLoading()
        if (res.data.code == 200 && res.data.data) {
            setNation(res.data.data)
        } else if (res.data.code == 401) {
            setTimeout(() => {
                history.push('/')
            }, 1000)
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    const getDataProvince = async () => {
        props.showLoading()
        const res = await dropdownGetIProvince({})
        props.hideLoading()
        if (res.data.code == 200 && res.data.data) {
            setProvince(res.data.data)
        } else if (res.data.code == 401) {
            setTimeout(() => {
                history.push('/')
            }, 1000)
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    const getDataDistrict = async () => {
        props.showLoading()
        const res = await dropdownGetIProvinceBy(province_id, {})
        props.hideLoading()
        if (res.data.code == 200 && res.data.data) {
            setDistrict(res.data.data)
        } else if (res.data.code == 401) {
            setTimeout(() => {
                history.push('/')
            }, 1000)
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    const getDataWard = async () => {
        props.showLoading()
        const res = await dropdownGetIProvinceBy(district_id, {})
        props.hideLoading()
        if (res.data.code == 200 && res.data.data) {
            setWard(res.data.data)
        } else if (res.data.code == 401) {
            setTimeout(() => {
                history.push('/')
            }, 1000)
        } else {
            toast.error(t(res.data.error), {
                theme: 'colored',
            })
        }
    }

    return (
        <>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                {nation_id ? (
                    <SelectValidator
                        variant={'outlined'}
                        label="Quốc gia *"
                        className="mb-4 w-full"
                        disabled
                        value={nation_id}
                        displayEmpty
                        name="nation_id"
                        onChange={handleChange}
                        validators={['required']}
                        errorMessages={['Không được để trống trường này']}
                    >
                        {nation?.map((e) => (
                            <MenuItem value={e.id}>{e.name}</MenuItem>
                        ))}
                    </SelectValidator>
                ) : null}
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
                {province_id || province_id ? (
                    <SelectValidator
                        variant={'outlined'}
                        label="Tỉnh thành phố *"
                        className="mb-4 w-full"
                        value={province_id}
                        displayEmpty
                        name="province_id"
                        onChange={handleChange}
                        validators={['required']}
                        errorMessages={['Không được để trống trường này']}
                    >
                        {province?.map((e) => (
                            <MenuItem value={e.id}>{e.name}</MenuItem>
                        ))}
                    </SelectValidator>
                ) : null}
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
                {district || district_id ? (
                    <SelectValidator
                        variant={'outlined'}
                        label="Quận huyện *"
                        className="mb-4 w-full"
                        value={district_id}
                        displayEmpty
                        name="district_id"
                        onChange={handleChange}
                        validators={['required']}
                        errorMessages={['Không được để trống trường này']}
                    >
                        {district?.map((e) => (
                            <MenuItem value={e.id}>{e.name}</MenuItem>
                        ))}
                    </SelectValidator>
                ) : null}
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
                {ward || ward_id ? (
                    <SelectValidator
                        variant={'outlined'}
                        label="Xã phường *"
                        className="mb-4 w-full"
                        value={ward_id}
                        displayEmpty
                        name="ward_id"
                        onChange={handleChange}
                        validators={['required']}
                        errorMessages={['Không được để trống trường này']}
                    >
                        {ward?.map((e) => (
                            <MenuItem value={e.id}>{e.name}</MenuItem>
                        ))}
                    </SelectValidator>
                ) : null}
            </Grid>
        </>
    )
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, { showLoading, hideLoading })(
    ProvinceSelect
)
