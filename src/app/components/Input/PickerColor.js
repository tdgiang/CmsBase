import React, { useState } from 'react'
import { SketchPicker } from 'react-color'

const PickerColor = (props) => {
    const { color, setColor } = props
    const handleChangeComplete = (color) => {
        setColor(color)
    }
    return <SketchPicker color={color} onChange={handleChangeComplete} />
}

export default PickerColor
