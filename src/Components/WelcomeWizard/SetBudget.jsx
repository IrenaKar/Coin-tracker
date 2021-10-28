import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import LogoText from '../Logo/LogoText';
import { FormControl } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import List from '@material-ui/core/List';

import RenderingCheckboxes from './RenderingCheckboxes';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),

        },
    },
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
        marginTop: '100px'
    },

    button: {
        textTranform: "uppercase",
        marginTop: "100px",
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
        alignSelf: "flex-end",
    },


}));

export default function WelcomePage() {
    const classes = useStyles();

    return (
        <Container maxWidth="sm" className={classes.input}>
            <LogoText />
            <h2 className={classes.h1}>
                welcome
            </h2>
            <Typography>
                Set how much money you want to spend on each category monthly
            </Typography>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <List component="nav" aria-label="main mailbox folders">
                    <RenderingCheckboxes />
                </List>
            </FormControl>
            <Link to="/overview">
                <Button fullWidth variant="contained" color="primary" className={classes.button}>
                    complete
                </Button></Link>
        </Container>
    )
}

