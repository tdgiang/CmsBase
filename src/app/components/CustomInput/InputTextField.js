import React from 'react'
import { Grid } from '@material-ui/core'
import { TextValidator } from 'react-material-ui-form-validator'
import { TYPE_INPUT } from 'app/utils'

function InputTextField(props) {
    const {
        value,
        name,
        title,
        typeInput,
        isRequired = false,
        handleChange,
        isDisabled = false,
        size = [6, 6, 12, 12],
    } = props

    const checkTypeValidator = (type) => {
        switch (type) {
            case TYPE_INPUT.EMAIL:
                return ['required', 'isEmail']
            case TYPE_INPUT.NUMBER:
                return ['required', 'isNumber']
            case TYPE_INPUT.IS_FLOAT:
                return ['required', 'isFloat']
            case TYPE_INPUT.PHONE:
                return [
                    'required',
                    'isNumber',
                    'minStringLength:10',
                    'maxStringLength:15',
                ]
            default:
                return ['required']
        }
    }

    const checkTypeErrorMes = (type) => {
        switch (type) {
            case TYPE_INPUT.EMAIL:
                return ['Không được để trống trường này', 'Email không hợp lệ']
            case TYPE_INPUT.NUMBER:
            case TYPE_INPUT.IS_FLOAT:
                return [
                    'Không được để trống trường này',
                    'Trường này phải nhập số ',
                ]

            case TYPE_INPUT.PHONE:
                return [
                    'Không được để trống trường này',
                    'Trường này phải nhập số ',
                    'Số điện thoại phải có ít nhất 10 chữ số',
                    'Số điện thoại nhiều nhất chỉ có 15 chữ số',
                ]
            default:
                return ['Không được để trống trường này']
        }
    }

    return (
        <Grid item lg={size[0]} md={size[1]} sm={size[2]} xs={size[3]}>
            {isRequired ? (
                <TextValidator
                    variant="outlined"
                    className="mb-4 w-full"
                    label={`${title} *`}
                    onChange={handleChange}
                    type={typeInput === TYPE_INPUT.NUMBER ? 'number' : 'text'}
                    name={name}
                    value={value || ''}
                    validators={checkTypeValidator(typeInput)}
                    errorMessages={checkTypeErrorMes(typeInput)}
                    disabled={isDisabled}
                />
            ) : (
                <TextValidator
                    variant="outlined"
                    className="mb-4 w-full"
                    label={title}
                    onChange={handleChange}
                    type={typeInput === TYPE_INPUT.NUMBER ? 'number' : 'text'}
                    name={name}
                    value={value || ''}
                    disabled={isDisabled}
                />
            )}
        </Grid>
    )
}

export default InputTextField
