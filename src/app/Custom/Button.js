import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
function InputText(props) {
    const classes = useStyles()
    const { type, text, onSubmit } = props
    return (
        <button
            className={
                type === 'submit' ? classes.buttonSave : classes.buttonCancel
            }
            onClick={onSubmit}
        >
            {text}
        </button>
    )
}

export default InputText

const useStyles = makeStyles((theme) => ({
    buttonCancel: {
        fontWeight: 500,
        color: '#FF0000',
        border: '1px solid #FF0000',
        borderRadius: 5,
        padding: '8px 13px',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    buttonSave: {
        fontWeight: 500,
        color: '#fff',
        borderRadius: 5,
        padding: '8px 13px',
        backgroundColor: 'var(--color-primary)',
        marginLeft: 10,
        border: 'none',
        cursor: 'pointer',
    },
}))
