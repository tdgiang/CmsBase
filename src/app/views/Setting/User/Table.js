import React, { useState } from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TablePagination,
    TableRow,
    IconButton,
    MenuItem,
    Select,
    Modal,
    Fade,
    Grid,
    Backdrop,
    Link,
    Button,
    Tooltip,
    Icon,
    Checkbox,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import colors from 'app/assets/Color'
import { useHistory } from 'react-router-dom'
import DialogTransition from 'app/components/dialog/DialogTransition'
import KEY from 'app/assets/Key'
import { connect } from 'react-redux'
import useStyles from 'app/styles/Table'
import { checkRole } from 'app/config/Function'
import useAuth from 'app/hooks/useAuth'

const columns = [
    {
        id: 'index',
        label: 'STT',
        align: 'center',
        width: 70,
    },
    {
        id: 'code',
        label: 'Mã NV',
        align: 'center',
        width: 140,
    },
    {
        id: 'full_name',
        label: 'Tên Người dùng',
        align: 'left',
        width: 'auto',
    },
    {
        id: 'user_group_name',
        label: 'Chức danh',
        align: 'left',
        width: 'auto',
    },
    {
        id: 'phone',
        label: 'Số điện thoại',
        align: 'left',
        width: 120,
    },
    {
        id: 'position',
        label: 'Đơn vị',
        align: 'left',
        width: 'auto',
    },
]

function StickyHeadTable(props) {
    const {
        data,
        handeChangeActive,
        removeItem,
        changeActive,
        setChangeActive,
        setPageIndex,
        setPageSize,
        pageIndex,
        totalRecords,
        permissions,
        setListSelected,
        listSelected,
    } = props
    const classes = useStyles()
    const [detailAccount, setDetailAccount] = useState()
    const [selected, setSelected] = useState({ fullname: '', sscid: '' })
    const [open, setOpen] = React.useState(false)
    const [clear, setClear] = React.useState(false)

    let history = useHistory()

    const handleChangePage = (event, newPage) => {
        setPageIndex(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setPageSize(event.target.value)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClear = () => {
        setClear(false)
    }
    const onSelectAll = (event) => {
        let newSelectedItemId
        if (event.target.checked) {
            const temp = data.filter((row) => row.status_id == 80)
            newSelectedItemId = temp.map((e) => e.id)
        } else {
            newSelectedItemId = []
        }
        setListSelected(newSelectedItemId)
    }

    const selectedOne = (value, id) => {
        let newList
        if (!value) {
            newList = listSelected.filter((e) => e != id)
        } else {
            newList = listSelected.concat(id)
        }
        setListSelected(newList)
    }

    const { user } = useAuth()

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell
                                style={{
                                    width: 40,
                                    backgroundColor: colors.headerTable,
                                }}
                            >
                                <Checkbox
                                    onChange={onSelectAll}
                                    style={{
                                        color: '#ffff',
                                    }}
                                    checked={
                                        listSelected.length === data.length
                                    }
                                    className={classes.checkbox}
                                    disabled={
                                        listSelected.length > 0 &&
                                        listSelected.length < data.length
                                    }
                                    indeterminate={
                                        listSelected.length > 0 &&
                                        listSelected.length < data.length
                                    }
                                />
                            </TableCell> */}

                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={'center'}
                                    style={{
                                        width: column.width,
                                        backgroundColor: colors.headerTable,
                                        color: 'white',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}

                            <TableCell
                                style={{
                                    backgroundColor: colors.headerTable,
                                    textAlign: 'center',
                                    width: 105,
                                    color: 'white',
                                    fontWeight: 500,
                                    fontSize: 16,
                                }}
                            >
                                Trạng thái
                            </TableCell>

                            <TableCell
                                style={{
                                    width: 120,
                                    textAlign: 'center',
                                    backgroundColor: colors.headerTable,
                                    color: 'white',
                                    fontWeight: 500,
                                    fontSize: 16,
                                }}
                            >
                                Hành động
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.columnTable}>
                        {data.map((row) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                >
                                    {/* <TableCell className={classes.border}>
                                        <Checkbox
                                            checked={listSelected.includes(
                                                row.id
                                            )}
                                            onChange={(event) =>
                                                selectedOne(
                                                    event.target.checked,
                                                    row.id
                                                )
                                            }
                                            color={'secondary'}
                                            className={classes.checkbox}
                                        />
                                    </TableCell> */}
                                    {columns.map((column) => {
                                        const avatar = row[column.id]

                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {column.format ? (
                                                    <img
                                                        src={column.format(
                                                            avatar
                                                        )}
                                                        className={
                                                            classes.image
                                                        }
                                                    />
                                                ) : (
                                                    avatar
                                                )}
                                            </TableCell>
                                        )
                                    })}

                                    <TableCell className={classes.border}>
                                        <Select
                                            variant={'outlined'}
                                            labelId="demo-simple-select-placeholder-label-label"
                                            id="demo-simple-select-placeholder-label"
                                            onChange={(e) =>
                                                handeChangeActive(
                                                    row.id,
                                                    e.target.value
                                                )
                                            }
                                            displayEmpty
                                            defaultValue={row.status}
                                            className={classes.formControl}
                                        >
                                            <MenuItem value={1}>
                                                Hiển thị
                                            </MenuItem>
                                            <MenuItem value={2}>Khóa</MenuItem>
                                        </Select>
                                    </TableCell>

                                    <TableCell className={classes.action}>
                                        {checkRole(
                                            user,
                                            '/setting/user/update'
                                        ) ? (
                                            <Tooltip title="Cập nhật">
                                                <IconButton
                                                    onClick={() => {
                                                        history.push({
                                                            pathname:
                                                                '/setting/user/update',
                                                            state: row.id,
                                                        })
                                                    }}
                                                    className={classes.button}
                                                    aria-label="edit"
                                                >
                                                    <Icon color="primary">
                                                        edit
                                                    </Icon>
                                                </IconButton>
                                            </Tooltip>
                                        ) : null}

                                        {checkRole(
                                            user,
                                            '/setting/user/delete'
                                        ) ? (
                                            <Tooltip title="Xoá">
                                                <IconButton
                                                    onClick={() => {
                                                        setSelected({
                                                            ...row,
                                                            title: 'Xóa Người dùng',
                                                            content: `Bạn có muốn xóa Người dùng ${row.full_name} hay không?`,
                                                        })
                                                        setOpen(true)
                                                    }}
                                                    className={classes.button}
                                                    aria-label="Delete"
                                                >
                                                    <Icon color="error">
                                                        delete
                                                    </Icon>
                                                </IconButton>
                                            </Tooltip>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <DialogTransition
                data={selected}
                open={open}
                handleClose={handleClose}
                onAgree={() => {
                    removeItem(selected.id)
                    handleClose()
                }}
            />
            <TablePagination
                component="div"
                page={pageIndex}
                count={totalRecords}
                rowsPerPage={10}
                rowsPerPageOptions={[]}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, {})(StickyHeadTable)
