import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import R from 'app/assets/images'
import { useOutsideAlerter } from 'app/hooks/useOutsiteAlert'

function InputSelect(props) {
    const {
        valueSelect,
        setValueSelect,
        listItem,
        placeholder,
        label = 'HUng',
        isRequired,
    } = props
    const classes = useStyles()
    const refDropdown = useRef(null)
    const [showDropdown, setShowDropDown] = useState(false)
    useOutsideAlerter(refDropdown, () => {
        showDropdown && setShowDropDown(false)
    })

    const handleAddItem = (item) => {
        setShowDropDown(false)
        setValueSelect(item.name)
    }

    return (
        <div className={classes.roleInput}>
            {label ? (
                <label>
                    {label} {isRequired && <span>(*)</span>}
                </label>
            ) : null}

            <div
                className={classes.unitApply}
                onClick={() => setShowDropDown(true)}
            >
                <div>
                    {valueSelect ? (
                        valueSelect
                    ) : (
                        <span style={{ fontSize: 12, opacity: 0.7 }}>
                            {placeholder}
                        </span>
                    )}
                </div>

                <img src={R.iconDown} alt="icon down" />

                {showDropdown && (
                    <div className={classes.dropDown} ref={refDropdown}>
                        {listItem?.map((item) => (
                            <div
                                key={item.id}
                                className={classes.listItemUnit}
                                onClick={() => handleAddItem(item)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InputSelect

const useStyles = makeStyles((theme) => ({
    roleInput: {
        marginTop: 20,
        '& label span': {
            color: '#F41A1A',
        },
    },
    unitApply: {
        border: '1px solid #ccc',
        borderRadius: 5,
        height: 34,
        padding: '7px 10px',
        display: 'flex',
        gap: '0 10px',
        alignItems: 'center',
        position: 'relative',
        '& > img': {
            position: 'absolute',
            right: 10,
            top: 14,
            cursor: 'pointer',
        },
    },

    listUnitApply: {
        display: 'flex',
        alignItems: 'center',
        gap: '0 10px',
        padding: '4px 10px',
        background: 'rgba(71, 171, 72, 0.15)',
        borderRadius: 3,
        color: 'var(--color-primary)',
        fontSize: 12,
        '& img': {
            cursor: 'pointer',
        },
    },
    listItemUnit: {
        height: 30,
        paddingLeft: 10,
        lineHeight: '30px',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: '#ccc',
        },
    },

    dropDown: {
        position: 'absolute',
        border: '1px solid #ccc',
        width: '100%',
        top: 35,
        left: 0,
        backgroundColor: '#fff',
        boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        // '& div': {
        //     borderBottom: '0.2px solid #ccc',
        // },
    },
}))
