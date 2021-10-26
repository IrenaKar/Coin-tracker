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
    const { entries, checked } = useContext(Context)



    const sumIncome = [...entries.reduce((r, o) => {
        const key = o.category + o.type;
        const item = r.get(key) || Object.assign({}, o, {
            amount: 0,
            newBudget: checked.find(x => x.category === o.category).budget,
        });

        item.amount += parseInt(o.amount);

        return r.set(key, item);
    }, new Map).values()];

    console.log(sumIncome);

    return (
        <div>
            {sumIncome.map((item) => {

                if (item.type === "income") {

                    return (

                        <>
                            <ListItem key={item.id} className={classes.incomeStyle} className={classes.text}>
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
