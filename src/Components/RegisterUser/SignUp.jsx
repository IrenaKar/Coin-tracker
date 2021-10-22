import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Logo from "../Logo/LogoText";
import { Button, Typography, OutlinedInput, TextField } from "@material-ui/core";
import { usePasswordValidation } from "./PasswordValidation";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        width: "100%",
        marginTop: "40px",
        marginBottom: "40px",

    },

    h1: {
        textTransform: "uppercase",
        fontSize: "30px",
        fontFamily: "Roboto",
        letterSpacing: "10px",
        textAlign: "center"


    },

    formStyle: {
        textAlign: "center"
    },

    div: {
        width: "200px",
        marginRight: "auto",
        marginLeft: "auto",
    },

    margin: {
        marginBottom: "50px"
    },
    textField: {
        width: '100%',
    },

    error: {
        color: "red"
    },

    btnBg: {
        backgroundColor: "#6200ee",
    }
    ,



}));





export default function MultilineTextFields(props) {


    const [password, setPassword] = useState({
        password: "",
        requiredLength: 8
    });

    const [
        validLength,
        specialChar,
        validLength2,
    ] = usePasswordValidation({
        password: password.password,
        requiredLength: password.requiredLength
    });

    const setFirst = (prop) => (event) => {
        setPassword({ ...password, password: event.target.value });
        setValues({ ...values, [prop]: event.target.value });


    };


    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: "",
        password: "",
        showPassword: false,
    });


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const history = useHistory();

    const formRef = React.useRef();

    const handleRedirectWelcome = () => {
        if (formRef.current.reportValidity()) {
            history.push({
                pathname: "./welcome",

            })
        }
    }


    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <div className={classes.div}>
                    <Logo />
                </div>
                <h1 className={classes.h1}>sign up</h1>
                <form autoComplete="off" ref={formRef} className={classes.formStyle}>

                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-email">Username</InputLabel>
                        <OutlinedInput
error={values.email}
                            id="outlined-adornment-email"
                            label="Username"
                            variant="outlined"
                            placeholder="Username"
                            type={"email"}
                            required
                        />
                    </FormControl>

                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" >

                        <InputLabel
                            error={!validLength || !validLength2 || !specialChar || !values.password}
                            htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                        
                            required
                            autofocus
                            error={!validLength || !validLength2 || !specialChar}
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={setFirst('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />


                    </FormControl>

                    <br />
                    <div>
                        {!validLength ? <span style={{ color: "red" }}>Password must contain at least 8 characters</span> : <span>{""}</span>}
                    </div>
                    <div className={classes.margin}>
                        {!specialChar ? <span style={{ color: "red" }}>{`Password must contain at least one of this characters
                        (!@#$%^&*)`} </span> : <span>{""}</span>}

                    </div>
                    <div className={classes.margin}>
                        {!validLength2 ? <span style={{ color: "red" }}>Password must be less than 32 characters
                        </span> : <span>{""}</span>}
                    </div>


                    <div>
                        <Button
                            classes={{ root: classes.btnBg }}
                            disabled={!validLength || !specialChar || !validLength2}
                            onClick={handleRedirectWelcome}
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Sign up
                        </Button>


                        <Typography>

                            Already have an account?

                        </Typography>
                        <Typography>
                            <Link to="/">
                                Sign in please.
                            </Link>
                        </Typography>
                    </div>


                </form>
            </Container>
        </React.Fragment>
    );
}
