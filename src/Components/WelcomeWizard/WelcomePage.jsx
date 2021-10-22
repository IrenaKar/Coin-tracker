import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import LogoText from '../Logo/LogoText';
import { FilledInput } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';


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
        marginTop: "150px",
    },
    error: {
        color: "red",
    }

}));

export default function WelcomePage() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        amount: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const history = useHistory();

    const handleRedirectZero = () => {
        history.push({
            pathname: "./choosecategory",

        })
    }

    return (
        <Container maxWidth="sm" className={classes.input}>
            <LogoText />
            <h2 className={classes.h1}>
                welcome
            </h2>
            <Typography>
                How much money do you have at the moment?
            </Typography>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel  error={values.amount === '0'}
                    htmlFor="filled-adornment-amount">Amount</InputLabel>
                <FilledInput
                    error={values.amount === '0'}
                    fullWidth
                    type="number"
                    id="filled-adornment-amount"
                    value={values.amount}
                    onChange={handleChange('amount')}
                    startAdornment={<InputAdornment position="right"></InputAdornment>}
                />
            </FormControl>
            <div className={values.amount === '0' ? classes.error : ""}>{values.amount === "0" ? "The amount must be higher than zero" : ""}</div>
            <Button disabled={values.amount === '0' || !values.amount} onClick={handleRedirectZero} fullWidth variant="contained" color="primary" className={classes.button}>
                add
            </Button>

        </Container>
    )
}
