import { Dialog, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { Context } from '../../../Provider'
import { Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import EditEntries from './EditEntries';



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
        cursor: "pointer"
    }

}));
export default function ListEntries() {

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

                    const { id, type, amount, category, icon, selectedDate } = item
                    console.log(id)
                    return (

                        <>
                            <ListItem className={classes.text}
                                key={id}
                                id={id}
                                style={{ paddingBottom: "0" }}
                            >
                                <ListItemIcon>
                                    <Icon>{icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={`${type} ${category}`} secondary={selectedDate} />

                                <ListItemText style={{ textAlign: "right" }} className={type === "income" ? classes.incomeStyle : classes.expenseStyle} primary={type === "income" ? ` +${amount}` : -amount} />

                            </ListItem>





                            <ListItem style={{ paddingTop: "0" }}  >
                                <ListItemIcon classes={{ root: classes.width }} style={{ marginLeft: "auto" }}  >
                                    <Icon
                                        style={{ fontSize: "18px" }}
                                        button onClick={() => {
                                            handleClick(item)
                                        }}>
                                        {'edit'}
                                    </Icon>
                                </ListItemIcon>
                                <ListItemIcon classes={{ root: classes.width }}  >
                                    <Icon
                                        style={{ fontSize: "18px" }}
                                        button onClick={() => {
                                            handleRemoveItem()
                                        }}>
                                        {'delete'}
                                    </Icon>
                                </ListItemIcon>
                                <ListItemIcon classes={{ root: classes.width }} >
                                    <Icon
                                        style={{ fontSize: "18px" }}
                                        button onClick={() => {
                                         addEntry(item)
                                        }}>
                                        {'bookmark'}
                                    </Icon>
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
