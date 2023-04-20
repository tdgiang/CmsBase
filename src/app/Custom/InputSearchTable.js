import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import R from 'app/assets/images'
function InputSearch(props) {
    const classes = useStyles()
    const { onChange, placeholder } = props
    return (
        <div>
            <div className={classes.roleInput}>
                <input
                    type="text"
                    onChange={onChange}
                    placeholder={placeholder || 'Tìm kiếm'}
                    className={classes.inputText}
                />
                <img
                    src={R.iconSearch}
                    alt="icon-search"
                    className={classes.iconSearch}
                />
            </div>
        </div>
    )
}

export default InputSearch

const useStyles = makeStyles((theme) => ({
    roleInput: {
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '& label span': {
            color: '#F41A1A',
        },
    },
    inputText: {
        border: '1px solid #ccc',
        borderRadius: 5,
        height: 34,
        paddingLeft: 10,
        '&:focus-visible': {
            outline: 'none',
        },
    },
    iconSearch: {
        position: 'absolute',
        right: 10,
        top: 8,
    },
}))
