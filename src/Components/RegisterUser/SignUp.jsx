import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Logo from "../Logo/LogoText";
import { Button, Typography, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { FormControl } from "@material-ui/core";
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as yup from 'yup';

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
        marginBottom: "10px",
        marginTop: "30px"
    },
    textField: {
        width: '100%',
    },

    btnBg: {
        backgroundColor: "#6200ee",
    }
    ,
}));

export default function MultilineTextFields(props) {

    const classes = useStyles();
    const [values, setValues] = React.useState({
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


    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .max(32, "Password should be of maximum 32 characters length")
            .required('Password is required')
            .matches(
                /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]./,
                'Need one special character',
            ),
    });


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            showPassword: false,

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            history.push({
                pathname: "./welcome",
            })
        },
    });


    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <div className={classes.div}>
                    <Logo />
                </div>
                <h1 className={classes.h1}>sign up</h1>
                <div className={classes.formStyle}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" required>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="outlined-adornment-email"
                                name="email"
                                label="Username"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="outlined-adornment-password"
                                name="password"
                                label="Password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton></InputAdornment>
                                }}

                            />
                        </FormControl>
                        <Button className={classes.margin} classes={{ root: classes.btnBg }} color="primary" variant="contained" type="submit">
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
                    </form>
                </div>
            </Container>
        </React.Fragment>
    );
}
