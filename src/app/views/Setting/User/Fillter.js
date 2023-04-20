import React from 'react'
import { Button, Icon, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    btnOpen: {
        borderColor: 'var(--color-primary)',
        color: 'var(--color-primary)',
        marginLeft: 20,
    },
    btnCancel: {
        borderColor: '#FF0000',
        width: 98,
        height: 36,
    },
    btnAccept: {
        backgroundColor: '#22AD4B',
        width: 98,
        height: 36,
    },
    txtAccept: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 700,
    },
    textCancel: {
        color: '#FF0000',
        fontSize: 15,
        fontWeight: 700,
    },
}))

export default function FormDialog() {
    const [open, setOpen] = React.useState(false)
    const classes = useStyles()
    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <div>
            <Button
                style={{ height: 40 }}
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                className={classes.btnOpen}
                startIcon={<Icon>filter_alt</Icon>}
            >
                <Typography
                    style={{
                        color: 'var(--color-primary)',
                        fontWeight: 'bold',
                    }}
                >
                    Bộ lọc
                </Typography>
            </Button>
            <Dialog
                open={open}
                maxWidth={'xs'}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions
                    style={{
                        marginRight: 10,
                        marginBottom: 10,
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        className={classes.btnCancel}
                    >
                        <Typography className={classes.textCancel}>
                            Huỷ
                        </Typography>
                    </Button>
                    <Button className={classes.btnAccept} onClick={handleClose}>
                        <Typography className={classes.txtAccept}>
                            Xác nhận
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
