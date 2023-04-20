import React from 'react'
import { SketchPicker } from 'react-color'
import Button from './Button'
import { makeStyles } from '@material-ui/core/styles'
function ColorPicker(props) {
    const { color, setColor, setShowColor, handleSaveColor } = props
    const classes = useStyles()
    const handleChangeComplete = (col) => {
        setColor(col.hex)
    }

    const handleCancelColor = () => {
        setColor(color)
        setShowColor({})
    }
    return (
        <div className={classes.colorPicker}>
            <SketchPicker
                color={color}
                onChangeComplete={handleChangeComplete}
                width="220px"
            />
            <div className={classes.buttonColor}>
                <Button type="" text="Hủy bỏ" onSubmit={handleCancelColor} />

                <Button
                    type="submit"
                    text="Áp dụng"
                    onSubmit={handleSaveColor}
                />
            </div>
        </div>
    )
}

export default ColorPicker

const useStyles = makeStyles((theme) => ({
    colorPicker: {
        position: 'relative',
    },
    buttonColor: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
}))
