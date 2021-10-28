import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { useContext } from 'react'
import { Context } from '../../../Provider'
import { makeStyles } from '@material-ui/styles';
import ProgressBar from './ProgressBar';


const useStyles = makeStyles((theme) => ({

    incomeStyle: {
        color: "#03dac5"
    },
    expenseStyle: {
        color: "red",
    },
    text: {
        textTransform: "capitalize",
        fontSize: "15px",
        fontFamily: "Roboto",
    },

    newRow: {
        display: 'inline'
    }
}));
export default function ListIncome() {
    const classes = useStyles();
    const { sumEntries } = useContext(Context)

    return (
        <div>
            {sumEntries.map((item) => {

                if (item.type === "income") {
                    return (
                        <>
                            <ListItem key={item.id} className={classes.incomeStyle, classes.text} >
                                <ListItemIcon>
                                    <Icon>{item.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={`${item.type} ${item.category}`} />
                                <ListItemText style={{ textAlign: "right" }} className={classes.incomeStyle} primary={`${item.amount} ${!item.newBudget ? "" : "/"} ${!item.newBudget ? "" : item.newBudget}`} />
                            </ListItem>
                            <div style={{ marginLeft: '50px', marginRight: '10px' }}>
                                <ProgressBar value={item.amount} max={item.newBudget} />
                            </div>

                        </>

                    )

                }
            })}

        </div>
    )
}
