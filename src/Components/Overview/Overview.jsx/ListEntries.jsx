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

    return (
        <div>
            <List>

                {entries.map((item) => {

                    const { type, amount, category, icon, selectedDate } = item
                    return (

                        <>
                            <ListItem className={classes.text}

                            >
                                <ListItemIcon>
                                    <Icon>{icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={`${type} ${category}`} secondary={selectedDate} />

                                <ListItemText style={{ textAlign: "right" }} className={type === "income" ? classes.incomeStyle : classes.expenseStyle} primary={type === "income" ? +amount : -amount} />
                            </ListItem>
                            <Divider classes={{ root: classes.marginDivider }} />
                        </>



                    )
                })}

            </List>

            <Dialog
                // this dialog is only to call Update Entry function

                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

            </Dialog>
        </div>
    )
}
