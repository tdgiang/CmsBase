import { makeStyles } from '@material-ui/core/styles'
import colors from '../assets/Color'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 580,
        wordBreak: 'break-word !important',
    },
    action: {
        width: '130px',
    },
    image: {
        width: 30,
        height: 30,
        objectFitL: 'cover',
    },
    formControl: {
        minWidth: 90,
    },
    border: {
        borderRight: '0.05px solid #e0e0e0',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: 5,
        padding: theme.spacing(0, 4, 3),
        width: 400,
        height: 200,
    },

    tableFooter: {
        paddingTop: 5,
        paddingLeft: 10,
        backgroundColor: colors.headerTable,
    },
    checkbox: { borderRadius: 0, padding: 0 },
    columnTable: {
        writingMode: 'horizontal-tb',
        cursor: 'pointer',
    },
}))

export default useStyles
