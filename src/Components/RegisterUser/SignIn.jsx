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
    btnBg: {
        backgroundColor: "#6200ee",
        marginTop: "60px"
    }

}));





export default function MultilineTextFields(props) {

    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: "",
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

    const handleRedirect = () => {
        history.push({
            pathname: "./overview",

        })
    }

    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <div className={classes.div}>
                    <Logo />
                </div>
                <h1 className={classes.h1}>sign In</h1>
                <form autoComplete="off" >
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-basic">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            placeholder="Username"
                            type={'email'}
                            required
                        />
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput

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
                            type="submit"
                        >
                            Sign in
                        </Button>


                        <Typography>

                            Dont have account yet?

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
