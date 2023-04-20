import React from 'react'
import { Grid } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'

function InputDateField(props) {
    const {
        date,
        title,
        handleDateChange,
        size = [6, 6, 12, 12],
        isDisabled = false,
        maxDate = '',
    } = props
    return (
        <Grid item lg={size[0]} md={size[1]} sm={size[2]} xs={size[3]}>
            <KeyboardDatePicker
                label={title}
                disableToolbar
                inputVariant={'outlined'}
                fullWidth
                disabled={isDisabled}
                clearable={true}
                format="dd/MM/yyyy"
                value={date}
                maxDate={maxDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </Grid>
    )
}

export default InputDateField
