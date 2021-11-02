import { Dialog, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { Context } from '../../../Provider'
import { Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import EditEntries from './EditEntries';
import DeleteIcon from "@material-ui/icons/Delete"
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({

    expenseStyle: {
        color: "red"
    },
    incomeStyle: {
        color: "#03dac5"
    },
    marginDivider: {
        marginLeft: "50px"
    },
    text: {
        textTransform: "capitalize",
        fontSize: "15px",
        fontFamily: "Roboto",
    },
    width: {
        minWidth: "0%",
    },
    padding: {
        paddingRight: "0px",
    },


}));
export default function ListEntries(index) {

    const classes = useStyles();

    const { entries, handleRemoveItem, addEntry } = useContext(Context)

    const [open, setOpen] = useState(false)
    const [item, setItem] = useState(null)

    const handleClick = (_item) => {
        setOpen(true)
        setItem(_item)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <List>

                {entries.map((item) => {
                    const { id, type, amount, category, icon, date } = item

                    return (

                        <>
                            <ListItem className={classes.text}
                                id={id}
                                key={id}

                                style={{ paddingBottom: "0" }}
                            >
                                <ListItemIcon>
                                    <Icon>{icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={`${type} ${category}`} secondary={date} />

                                <ListItemText style={{ textAlign: "right" }} className={type === "income" ? classes.incomeStyle : classes.expenseStyle} primary={type === "income" ? ` +${amount}` : -amount} />

                            </ListItem>

                            <ListItem style={{ paddingTop: "0" }}  >
                                <ListItemIcon classes={{ root: classes.width }} style={{ marginLeft: "auto" }}  >
                                    <IconButton style={{ paddingTop: "0" }} aria-label="edit entry"
                                        button onClick={() => {
                                            handleClick(item)
                                        }}>
                                        <EditIcon style={{ fontSize: "18px" }} />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemIcon classes={{ root: classes.width }}  >
                                    <IconButton style={{ paddingTop: "0" }} aria-label="delete entry"
                                        button onClick={(e) => { if (window.confirm('Are you sure you wish to delete this entry?')) handleRemoveItem(id) }}>
                                        <DeleteIcon style={{ fontSize: "18px" }} />
                                    </IconButton>

                                </ListItemIcon>
                                <ListItemIcon classes={{ root: classes.width }} >

                                    <IconButton style={{ paddingTop: "0" }} classes={{ root: classes.padding }} aria-label="copy entry"
                                        button onClick={() => {
                                            addEntry({
                                                ...item,
                                                id: new Date().valueOf()
                                            })
                                        }}>
                                        <FileCopyIcon style={{ fontSize: "18px" }} />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                            <Divider classes={{ root: classes.marginDivider }} />
                        </>



                    )
                })}

            </List>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <EditEntries handleClose={handleClose} entry={item} />
            </Dialog>
        </div>
    )
}
