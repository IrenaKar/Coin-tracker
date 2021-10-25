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

    const { entries, checked } = useContext(Context)

    // const sumExpense = [];
    // entries.reduce(function (res, value) {
    //     const newBudget = checked.find(x => x.category === value.category).budget
    //     console.log(checked)
    //     if (!res[value.category]) {
    //         res[value.category] = {category: value.category, amount: 0, type: value.type, icon: value.icon, id: value.id, budget: +newBudget };
    //         sumExpense.push(res[value.category])
    //     }
    //     res[value.category].amount += parseInt(value.amount);
    //     return res;
    // }, {});
    // console.log(sumExpense)

    // const sumExpense = [...entries.reduce((r, o) => {
    //     const key = o.category + o.type;
        
    //     const item = r.get(key) || Object.assign({}, o, {
    //       amount: 0,
    //     });
        
    //     item.amount += o.amount;
      
    //     return r.set(key, item);
    //   }, new Map).values()];
      
    //   console.log(sumExpense);

    const sumExpense = [...entries.reduce((r, o) => {

        const key = o.category  + o.type;
        
        const item = r.get(key) || Object.assign({}, o, {
          amount: 0,
          newBudget: checked.find(x => x.category === o.category).budget,
        });
        
        item.amount += parseInt(o.amount);
     
      
        return r.set(key, item);
      }, new Map).values()];
      
      console.log(sumExpense);

    return (
        <div>

            {sumExpense.map((item) => {

                if (item.type === "expence") {

                    return (
                        <>
                            <ListItem id={item.id} key={item.id} style={(item.newBudget === 0 || item.amount < item.newBudget) ? { color: "black" } : { color: "red" }}
                                className={classes.text}>
                                <ListItemIcon>
                                    <Icon style={(item.newBudget === 0 || item.amount < item.newBudget) ? { color: "black" } : { color: "red" }} >{item.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={`${item.type} ${item.category}`}/>  
                                <ListItemText style={(item.newBudget === 0 || item.amount < item.newBudget) ? { color: "black" } : { color: "red" }, {textAlign: 'right'}} className={classes.expenseStyle} primary={`${item.amount} ${!item.newBudget ? "" : "/"} ${!item.newBudget ? "" : item.newBudget}`}/>
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
