import React from 'react'
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    Select,
    TextField,
    Icon,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import colors from 'app/assets/Color'
import { Breadcrumb } from 'app/components'
import { checkRole } from 'app/config/Function'
import useAuth from 'app/hooks/useAuth'
import 'date-fns'
import { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TableAccount from './Table'
import Fillter from './Fillter'

const useStyles = makeStyles((theme) => ({
    home: {
        display: 'flex',
        fontSize: 20,
        marginTop: 20,
        textTransform: 'capitalize',
    },
    button: {
        textTransform: 'capitalize',
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        marginRight: 20,
        '&:hover': {
            backgroundColor: colors.main,
        },
    },
    buttonUnCheck: {
        textTransform: 'capitalize',
        marginRight: 20,
        borderColor: 'var(--color-primary)',
        color: 'var(--color-primary)',
    },
    buttonStop: {
        textTransform: 'capitalize',
        marginRight: 20,

        borderColor: '#FFB800',
        color: '#FFB800',
    },

    formControl: {
        width: 150,
        marginLeft: 20,
    },
    icon: {
        marginTop: 3,
    },
    title: {
        fontWeight: 'bold',
    },

    buttons: {
        marginRight: theme.spacing(2),
        textTransform: 'capitalize',
        textTransform: 'capitalize',
        background: '#4caf50 !important',
        color: '#fff',
    },
    search: {
        minWidth: 200,
        height: 30,
    },
    flexfilter: {
        display: 'flex',
    },
    active: {
        marginLeft: 30,
    },
    addaccount: {
        color: '#fff',
        textDecoration: 'none',
    },
    wrapRight: {
        display: 'flex',
    },
}))

function ToolNotificate(props) {
    const {
        data,
        updateItem,
        removeItem,
        setTxtSearch,
        changeActive,
        setChangeActive,
        handeChangeActive,
        setPageIndex,
        pageIndex,
        totalRecords,
        permissions,
        setListSelected,
        listSelected,
        listStatus,
        listUserGroup,
        setStatus,
        setUserGroup,
        status,
        userGroup,
    } = props
    const classes = useStyles()
    const { user } = useAuth()
    return (
        <Fragment>
            <div className="m-sm-20">
                <div className="mb-sm-20"></div>
                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={3}
                        style={{
                            margin: 10,
                        }}
                    >
                        <Grid
                            justify={'space-between'}
                            alignItems={'center'}
                            container
                            spacing={3}
                        >
                            <div>
                                <Link to="/setting/user/create">
                                    <Button
                                        variant="contained"
                                        n
                                        className={classes.button}
                                        startIcon={<Icon>add</Icon>}
                                    >
                                        Thêm mới
                                    </Button>
                                </Link>
                                {/* <Button
                                    className={classes.buttonUnCheck}
                                    variant="outlined"
                                >
                                    Bỏ chọn
                                </Button>

                                <Button
                                    variant="outlined"
                                    className={classes.buttonStop}
                                    startIcon={<Icon>pending</Icon>}
                                >
                                    Ngừng sử dụng
                                </Button> */}
                            </div>

                            <div className={classes.wrapRight}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="tìm kiếm ..."
                                    onChange={(e) => {
                                        setTxtSearch(e.target.value)
                                    }}
                                    className={classes.search}
                                />
                                <FormControl
                                    style={{
                                        width: 200,
                                        marginLeft: 10,
                                        marginRight: 10,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="outlined-age-native-simple">
                                        Trạng thái
                                    </InputLabel>
                                    <Select
                                        native
                                        label="Trạng thái"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        <option value="null">Tất cả</option>
                                        {listStatus.map((e) => (
                                            <option value={e.id}>
                                                {e.name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl
                                    style={{
                                        width: 200,
                                        marginRight: 8,
                                    }}
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="outlined-age-native-simple">
                                        Vai trò
                                    </InputLabel>
                                    <Select
                                        native
                                        label="Vai trò"
                                        value={userGroup}
                                        onChange={(e) =>
                                            setUserGroup(e.target.value)
                                        }
                                    >
                                        <option value="null">Tất cả</option>
                                        {listUserGroup.map((e) => (
                                            <option value={e.id}>
                                                {e.name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* <Fillter /> */}
                            </div>
                        </Grid>
                    </Grid>

                    <Grid xs={12} item>
                        <TableAccount
                            data={data}
                            changeActive={changeActive}
                            setChangeActive={setChangeActive}
                            handeChangeActive={handeChangeActive}
                            updateItem={updateItem}
                            removeItem={removeItem}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            totalRecords={totalRecords}
                            permissions={permissions}
                            setListSelected={setListSelected}
                            listSelected={listSelected}
                        />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}

export default ToolNotificate
