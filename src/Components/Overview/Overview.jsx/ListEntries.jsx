import { Dialog, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { Context } from '../../../Provider'
import { Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddEntries from './AddEntries'


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

}));
export default function ListEntries() {

    const classes = useStyles();

    const { entries } = useContext(Context)

    const [open, setOpen] = useState(false)
    const [item, setItem] = useState(null)

    const handleClick = (_item) => {
        setOpen(true)
        setItem(_item)

    }

    const handleClose = () => {
        setOpen(false)
    }
    const [show, setShow] = useState(false);

    return (
        <div>
            <List>

                {entries.map((item) => {

                    const { type, amount, category, selectedDate, icon } = item

                    return (

                        <>
                            <ListItem button onClick={() => {
                                handleClick(item)
                            }} className={classes.text}

                            >
                                <ListItemIcon>
                                    <Icon>{icon}</Icon>
                                </ListItemIcon>
                                <ListItemText />{type} {category}
                                <ListItemText />{selectedDate}

                                <ListItemText style={{ textAlign: "right" }} className={type === "income" ? classes.incomeStyle : classes.expenseStyle} primary={amount} />
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

                <AddEntries category={item} />

            </Dialog>
        </div>
    )
}
