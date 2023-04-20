import React, { useState, useEffect } from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import useStyles from 'app/styles/Table'
import { useTranslation } from 'react-i18next'
function ListActive(props) {
    const { handeChangeActive, row } = props
    const history = useHistory()
    const [listActive, setListActive] = useState()
    const classes = useStyles()
    const { t } = useTranslation()
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const res = await dropdownListActive({})
        if (res.data.code == 200 && res.data.data) {
            setListActive(res.data.data)
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
            <Select
                variant={'outlined'}
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                onChange={(e) => handeChangeActive(row.id, e.target.value)}
                displayEmpty
                defaultValue={row.status}
                className={classes.formControl}
            >
                {listActive?.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                ))}
            </Select>
        </>
    )
}

export default ListActive
