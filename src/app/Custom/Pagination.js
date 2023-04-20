import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}))

export default function PaginationControlled(props) {
    const { pagination, setPagination } = props
    const { page, totalPage } = pagination
    const classes = useStyles()
    const handleChange = (event, value) => {
        setPagination({ ...pagination, page: value })
    }

    return (
        <div className={classes.root}>
            <Pagination
                variant="outlined"
                shape="rounded"
                count={totalPage}
                page={page}
                onChange={handleChange}
                size="small"
            />
        </div>
    )
}
