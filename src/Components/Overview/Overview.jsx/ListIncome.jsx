import { Box, Icon, LinearProgress, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../Provider'
import { makeStyles } from '@material-ui/styles';
import parseISOWithOptions from 'date-fns/esm/fp/parseISOWithOptions/index.js';
import ProgressBar from './ProgressBar';


const useStyles = makeStyles((theme) => ({

    incomeStyle: {
        color: "#03dac5"
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
    entries.reduce(function (res, value, index) {
        const newBudget = checked[index].budget
        if (!res[value.category]) {
            res[value.category] = { category: value.category, amount: 0, type: value.type, icon: value.icon, budget: +newBudget };
            sumIncome.push(res[value.category]) 
        }
        res[value.category].amount += parseInt(value.amount);
        return res;
    }, {});
    // const res = sumIncome.map((el, index) => el.category === checked[index].category && parseInt(checked[index].budget))
    console.log(sumIncome)
    // console.log(res)

    return (
        <div>
            {sumIncome.map((item) => {
        
              

                    return (

                        <>
                            <ListItem className={classes.incomeStyle, classes.text}>
                                <ListItemIcon>
                                    <Icon>{item.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText />{item.type} {item.category}
                                <ListItemText />{item.selectedDate}
                                <ListItemText style={{ textAlign: "right" }} className={item.type === "income" ? classes.incomeStyle : classes.expenseStyle} /> {item.amount} / {item.budget}
                            </ListItem>
                            <div style={{marginLeft: '10px', marginRight: '10px'}}>
                                <ProgressBar value={item.amount} max={item.budget} />
                            </div>

                        </>


                    )
                

            })}

        </div>
    )
}
