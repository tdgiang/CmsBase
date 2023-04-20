import React from 'react'
import { Grid, MenuItem } from '@material-ui/core'
import { SelectValidator } from 'react-material-ui-form-validator'

function SelectInputField(props) {
    const {
        value,
        title,
        name,
        handleChange,
        listData,
        isRequired = false,
        isDisabled = false,
        size = [6, 6, 12, 12],
    } = props
    return (
        <Grid lg={size[0]} md={size[1]} sm={size[2]} xs={size[3]} item>
            {isRequired ? (
                <SelectValidator
                    variant={'outlined'}
                    label={`${title} *`}
                    className="w-full"
                    value={value}
                    displayEmpty
                    name={name}
                    onChange={handleChange}
                    disabled={isDisabled}
                    validators={['required']}
                    errorMessages={['Không được để trống trường này']}
                >
                    {listData?.map((e) => (
                        <MenuItem value={e.id}>{e.name}</MenuItem>
                    ))}
                </SelectValidator>
            ) : (
                <SelectValidator
                    variant={'outlined'}
                    label={title}
                    className="w-full"
                    value={value}
                    displayEmpty
                    name={name}
                    disabled={isDisabled}
                    onChange={handleChange}
                >
                    {listData?.map((e) => (
                        <MenuItem value={e.id}>{e.name}</MenuItem>
                    ))}
                </SelectValidator>
            )}
        </Grid>
    )
}

export default SelectInputField
