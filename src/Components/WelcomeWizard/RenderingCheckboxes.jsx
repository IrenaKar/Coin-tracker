import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Context } from '../../Provider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { Fragment } from 'react';
import { Icon, Input, InputAdornment, InputBase, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    margin: {
        marginRight: "auto"
    },
    text: {
        textTransform: "capitalize",
        fontSize: "15px",
        fontFamily: "Roboto",
    },
    align: {
        textAlign: "left"
    }

}))



export default function RenderingCheckboxes() {
    const classes = useStyles();

    const { checked, setChecked } = useContext(Context)

    const updateChecked = (prop, event, i) => {
        const old = checked[i];
        const updated = { ...old, [prop]: event.target.value };
        const clone = [...checked];

        clone[i] = updated;
        setChecked(clone);
    };

    const [budget, setBudget] = useState(checked)

    return (
        <div>
            {checked.map((item, i) => {

                return (
                    <Fragment>
                        <ListItem classes={{ root: classes.align }} className={classes.text} id={item.id} key={i}
                        >
                            <ListItemIcon>
                                <Icon>  {item.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText value={item.category} primary={item.category} />
                            <InputBase
                                id="outlined-adornment-amount"
                                value={budget.budget}
                                onChange={(e) => updateChecked("budget", e, i)} value={budget.budget}
                                endAdornment={<InputAdornment position="start"  value={item.currency}>{item.currency}</InputAdornment>}
                                label="Budget"
                                placeholder="enter budget"
                            />




                        </ListItem>

                        <Divider />

                    </Fragment>
                );


            })}
        </div>
    )
}
