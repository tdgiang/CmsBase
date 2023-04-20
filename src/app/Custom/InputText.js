import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
function InputText(props) {
    const classes = useStyles()
    const {
        label,
        type,
        placeholder,
        value,
        onChange,
        isRequired,
        error,
        isDisable,
    } = props
    return (
        <div>
            <div className={classes.roleInput}>
                <label>
                    {label} {isRequired && <span>(*)</span>}
                </label>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={classes.inputText}
                    disabled={isDisable}
                />
            </div>
            {value === '' && isRequired ? (
                <div className={classes.error}>{error}</div>
            ) : null}
        </div>
    )
}

export default InputText

const useStyles = makeStyles((theme) => ({
    roleInput: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
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

    error: {
        color: 'red',
        fontSize: 12,
    },
}))
