import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
function TableView(props) {
    const { dataTable } = props
    const classes = useStyles()
    return (
        <table className={classes.table}>
            <colgroup>
                <col width="50px" />
                <col width="auto" />
                <col width="auto" />
                <col width="auto" />
                <col width="auto" />
                <col width="auto" />
            </colgroup>
            <thead className={classes.theadTable}>
                <tr>
                    <th>STT</th>
                    <th>Mã nhân viên</th>
                    <th>Tên nhân viên</th>
                    <th>Đơn vị</th>
                    <th>Chức danh</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {dataTable?.map((item, index) => (
                    <tr
                        key={item.id}
                        style={{
                            backgroundColor:
                                index % 2 !== 0 ? '#F9F9F9' : '#fff',
                        }}
                    >
                        <td>{index + 1}</td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.unit}</td>
                        <td>{item.title}</td>
                        <td>{item.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableView

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
        borderRadius: 10,
        boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
        marginTop: 20,
        marginBottom: 20,

        '& thead tr th': {
            '&:first-child': {
                borderTopLeftRadius: 10,
            },
            '&:last-child': {
                borderTopRightRadius: 10,
            },
        },

        '& tbody tr td': {
            textAlign: 'center',
            height: 30,
        },
        '& tbody': {
            height: 200,
            overflowY: 'auto',
        },
    },
    theadTable: {
        borderRadius: '10px 10px 0px 0px',

        '& tr': {
            textAlign: 'center',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            fontWeight: '500',

            '& th': {
                padding: '8px',
            },
        },
    },
}))
