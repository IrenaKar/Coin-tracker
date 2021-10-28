import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { useContext } from 'react'
import { Context } from '../../../Provider'
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from './ProgressBar';



const useStyles = makeStyles((theme) => ({

    expenseStyle: {
        color: "red",
    },
    incomeStyle: {
        color: "#03dac5"
    },
    text: {
        textTransform: "capitalize",
        fontSize: "15px",
        fontFamily: "Roboto",
    },
}));

export default function ListExpences() {
    const classes = useStyles();

    const { sumEntries} = useContext(Context)

    return (
        <div>

            {sumEntries.map((item) => {

                if (item.type === "expence") {

                    return (
                        <>
                            <ListItem key={item.id} style={(item.newBudget === 0 || item.amount < item.newBudget) ? { color: "" } : { color: "red" }}
                                className={classes.text}>
                                <ListItemIcon>
                                    <Icon style={(item.newBudget === 0 || item.amount < item.newBudget) ? { color: "" } : { color: "red" }} >{item.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={`${item.type} ${item.category}`}/>  
                                <ListItemText style={(item.newBudget === 0 || item.amount < item.newBudget) ? { color: "" } : { color: "red" }, {textAlign: 'right'}} className={classes.expenseStyle} primary={`${item.amount} ${!item.newBudget ? "" : "/"} ${!item.newBudget ? "" : item.newBudget}`}/>
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
