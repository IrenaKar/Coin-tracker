import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Context } from '../../Provider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { Fragment } from 'react';
import { Icon, InputAdornment, InputBase, ListItemText } from '@material-ui/core';

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
        textAlign: "left",
    },
    colorBlack: {
        color: "black"
    },
    budget: {
        marginBottom: "40px",
        textAlign: "left",
        color: "red",
        textDecoration: "underline",
    }

}))


export default function RenderingCheckboxes() {
    const classes = useStyles();

    const { checked, setChecked, values, setValues } = useContext(Context)

    const updateChecked = (prop, event, id) => {
        const old = checked[id];
        const updated = { ...old, [prop]: event.target.value };
        const clone = [...checked];
        clone[id] = updated;
        setChecked(clone);
        localStorage.setItem("category", JSON.stringify(clone))

    };

    // window.localStorage.setItem("amount", JSON.stringify(values.amount))

    // useEffect(() => {
    //     const amount = localStorage.getItem("amount");
    //     const savedAmount = JSON.parse(amount);
    //     if (!savedAmount) {
    //         setValues(savedAmount);
    //     }
    // }, []);

    return (
        <div>
            <div className={classes.text, classes.budget}>
                Current available Budget{" "} {`${values.amount}`} {" "}MKD
            </div>

            {checked.map((item, id) => {

                return (
                    <Fragment>

                        <ListItem classes={{ root: classes.align }} className={classes.text} id={item.id} key={id}
                        >
                            <ListItemIcon>
                                <Icon className={classes.colorBlack}>  {item.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText value={item.category} primary={item.category} />
                            <InputBase
                                style={{ width: "150px" }}
                                id="outlined-adornment-amount"
                                value={item.budget}
                                onChange={(e) => updateChecked("budget", e, id)}
                                endAdornment={<InputAdornment position="start" value={item.currency}>{item.currency}</InputAdornment>}
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
