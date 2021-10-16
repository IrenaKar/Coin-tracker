import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { useContext } from 'react'
import { Context } from '../../../Provider'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    expenseStyle: {
        color: "red",
    },
    text: {
        textTransform: "capitalize",
        fontSize: "15px",
        fontFamily: "Roboto",
    },
}));

export default function ListExpences() {
    const classes = useStyles();

    const { entries } = useContext(Context)

    const sumExpense = [];
    entries.reduce(function (res, value) {
        if (!res[value.category]) {
            res[value.category] = { category: value.category, amount: 0, type: value.type, icon: value.icon };
            sumExpense.push(res[value.category])
        }
        res[value.category].amount += parseInt(value.amount);
        return res;
    }, {});

    // console.log(sumExpense)


    return (
        <div>

            {sumExpense.map((item) => {
                // const { type, amount, category, icon, selectedDate } = item

                if (item.type === "expence") {

                    return (

                        <ListItem className={classes.text}

                        >
                            <ListItemIcon>
                                <Icon>{item.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText />  {item.type} {item.category}
                            <ListItemText /> {item.selectedDate}
                            <ListItemText style={{ textAlign: "right" }} primary={item.amount} className={classes.expenseStyle} />
                        </ListItem>

                    )
                }
            })}

        </div>
    )
}
