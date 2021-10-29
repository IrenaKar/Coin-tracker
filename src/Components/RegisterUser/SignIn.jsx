import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Logo from "../Logo/LogoText";
import { Button, OutlinedInput, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
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
    btnBg: {
        backgroundColor: "#6200ee",
        marginTop: "60px"
    },

}));

export default function MultilineTextFields(props) {

    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: true,
        password: "",
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const history = useHistory();

    const formRef = React.useRef();


function isValidEmailAddress(val) {
    const regEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/;
    if (!regEmail.test(val)) {
      return 'Invalid Email Address';
    }
  }
    const handleRedirect = () => {
        if (formRef.current.reportValidity()) {
            history.push({
                pathname: "./overview",
            })
        }
    }

    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <div className={classes.div}>
                    <Logo />
                </div>
                <h1 className={classes.h1}>sign In</h1>
                <form
                 autoComplete ref={formRef}
                 >
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel error={!values.email} htmlFor="outlined-basic">Username</InputLabel>
                        <OutlinedInput
                        onChange={(event) => setValues({email: event.target.value})}
                        onFocus={() => setValues({
                            emailIsValid: isValidEmailAddress(values.email)
                        })}
                            error={!values.email}
                            required
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            placeholder="Username"
                            type={'email'}
                            name="email"
                        />
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-password" error={!values.password}>Password</InputLabel>
                        <OutlinedInput

                            error={!values.password}
                            required
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
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
                    <div className={classes.formStyle}>
                        <Button
                            classes={{ root: classes.btnBg }}
                            type={'submit'}
                            autoFocus
                            onClick={handleRedirect}
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                        >
                            Sign in
                        </Button>
                        <Typography>
                            Don't have an account yet?
                        </Typography>
                        <Typography>
                            <Link to="/signup">
                                Sign up now, it is free!
                            </Link>
                        </Typography>
                    </div>
                </form>
            </Container>
        </React.Fragment>
    );
}
