import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { FormGroup, Icon, Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import LogoText from '../Logo/LogoText';
import { FormControl } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { Fragment } from 'react';
import { Context } from '../../Provider';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({

    h1: {
        textTransform: "uppercase",
        fontSize: "30px",
        fontFamily: "Roboto",
        letterSpacing: "10px",
        textAlign: "center"
    },
    input: {
        textAlign: 'center'
    },

    margin: {
        marginTop: '50px'
    },

    button: {
        textTranform: "uppercase",
        marginTop: "50px",
        marginBottom: "80px",
        backgroundColor: "#6200ee",

    },

    // colorListItem: {
    //     color: "black",
    // },
    expenseStyle: {
        color: "red"
    },
    incomeStyle: {
        color: "#03dac5"
    },
}));

export default function WelcomePage() {
    const classes = useStyles();


    const { categories } = useContext(Context)
    const [disabled, setDisabled] = useState(true);

    const { checked, clickHandler } = useContext(Context)

    const [list] = useState(categories);


    useEffect(() => {
        if (checked.length > 0) {
            setDisabled(false);

        } else {
            setDisabled(true);

        }
    }, [checked.length]);

    const history = useHistory();

    const handleRedirectBudget = () => {
        history.push({
            pathname: "./budget",

        })
    }

    return (
        <Container maxWidth="sm" className={classes.input}>
            <LogoText />
            <h2 className={classes.h1}>
                welcome
            </h2>
            <Typography>
                Choose what your income or expense category
            </Typography>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <List component="nav" aria-label="main mailbox folders">
                    {list.map((item, index) => {
                        return (
                            <Fragment>
                                <ListItem
                                    button id={item.id} key={index}

                                >
                                    <ListItemIcon classes={item.type === "income" ? {root: classes.incomeStyle} : {root: classes.expenseStyle} }>
                                        <Icon>
                                            {item.icon}
                                        </Icon>
                                    </ListItemIcon>
                                    <ListItem style={{ padding: "0", justifyContent: "flex-end"}}>
                                        <FormControlLabel
                                            labelPlacement="start"
                                            className={classes.colorListItem}
                                            label={item.category}
                                            control={
                                                <Checkbox color="success" />
                                            }
                                            key={index}
                                            id={item.id}
                                            onClick={() => clickHandler({
                                                ...item,
                                                id: new Date().valueOf()
                                            })}
                                        />
                                    </ListItem>
                                </ListItem>
                                <Divider />

                            </Fragment>
                        );

                    })}

                </List>

            </FormControl>

            <Button disabled={!checked.length} onClick={handleRedirectBudget} fullWidth variant="contained" color="primary" classes={{root: classes.button}}>
                done
            </Button>
        </Container>
    )
}

