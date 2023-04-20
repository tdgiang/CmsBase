import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
    },
    labelIcon: {},
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}))
export default function FileSystemNavigator(props) {
    const classes = useStyles()

    const { listChecked, onCheckItem, data } = props

    const handleChange = (event) => {
        onCheckItem(event.target.checked, event.target.name)
    }

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {data.map((item, index) => (
                <TreeItem nodeId={item.code} label={item.name}>
                    {item.actions.map((e) => (
                        <TreeItem
                            nodeId="1"
                            label={
                                <div className={classes.labelRoot}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={handleChange}
                                                checked={listChecked.includes(
                                                    `${e.action_id}`
                                                )}
                                                name={e.action_id}
                                                color="primary"
                                            />
                                        }
                                        label={e.action_name}
                                    />
                                </div>
                            }
                        />
                    ))}
                </TreeItem>
            ))}
        </TreeView>
    )
}
