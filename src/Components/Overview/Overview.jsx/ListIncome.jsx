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


    const sumIncome = [];
    entries.reduce(function (res, value) {
        const newBudget = checked.find(x => x.category === value.category).budget
        if (!res[value.category]) {
            console.log(res[value.category])
            res[value.category] = { category: value.category, amount: 0, type: value.type, icon: value.icon, budget: +newBudget };
            sumIncome.push(res[value.category])
        }
        res[value.category].amount += parseInt(value.amount);
        // console.log(parseInt(value.amount))
        console.log(res[value.category].amount)
        return res;
    }, {});
    console.log(sumIncome)

    return (
        <div>
            {sumIncome.map((item) => {

                if (item.type === "income") {

                    return (

                        <>
                            <ListItem className={classes.incomeStyle} className={classes.text}>
                                <ListItemIcon>
                                    <Icon>{item.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={`${item.type} ${item.category}`} />
                                <ListItemText style={{ textAlign: "right" }} className={classes.incomeStyle} primary={`${item.amount} ${!item.budget ? "" : "/"} ${!item.budget ? "" : item.budget}`} /> 
                            </ListItem>
                            <div style={{ marginLeft: '50px', marginRight: '10px' }}>
                                <ProgressBar value={item.amount} max={item.budget} />
                            </div>

                        </>


                    )

                }
            })}

        </div>
    )
}
