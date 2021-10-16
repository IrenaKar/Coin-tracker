


import React, { useContext } from "react";
import Logo from '../../Logo/Logo';
import { Box, List, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Context } from '../../../Provider';
import HomeIcon from "@material-ui/icons/Home";
import WidgetsIcon from "@material-ui/icons/Widgets";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddEntries from "./AddEntries";
import ListEntries from "./ListEntries";
import { Link } from "react-router-dom";
import ListIncome from "./ListIncome";
import ListExpences from "./ListExpences";

const useStyles = makeStyles((theme) => ({


    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(100),
            height: theme.spacing(40),

        },
    },
    header: {
        textAlign: 'left',
        background: theme.palette.grey[200],
        padding: theme.spacing(2)
    },

    links: {
        color: "white",
        textDecoration: "none"
    },
    width: {
        width: "100%"
    },
    avatarImg: {
        marginRight: "15px"
    },

}));

const styleDiv1 = {
    backgroundColor: "#6200ee",
    height: "70px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    div: {
        width: "80px",
    },
    h2: {
        color: "white",
        fontFamily: "Roboto",
    },
    flex: {
        display: "flex"
    }
};

const styleDiv2 = {
    backgroundColor: "#6200ee",
    height: "70px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "fixed",
    bottom: "0",
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto",
    p: {
        margin: '0px'
    },


};

export default function Overview() {

    const classes = useStyles();
    const { img } = useContext(Context)

    return (

        <Box >
            <div style={styleDiv1}>
                <div style={styleDiv1.flex}>
                    <div style={styleDiv1.div}>
                        <Logo />
                    </div>
                    <h2 style={styleDiv1.h2}>Overview</h2>
                </div>
                {img.map((el) => {
                    return (
                        <Avatar className={classes.avatarImg}>
                            <img
                                src={el.picture.thumbnail}
                                alt="random image"
                                key={el.picture}
                            />
                        </Avatar>

                    )
                })}
            </div>

            <div className={classes.root}>

                <Paper elevation={6}>
                    <Typography className={classes.header}>
                        Income
                    </Typography>

                    <List>
                        <ListIncome />
                    </List>

                </Paper>
                <Paper elevation={6}>
                    <Typography className={classes.header}>
                        Expences
                    </Typography>

                    <List>
                        <ListExpences />
                    </List>

                </Paper>
                <Paper elevation={6}>
                    <Typography className={classes.header}>
                        Entries
                    </Typography>


                    <List>
                        <ListEntries />

                    </List>

                </Paper>
            </div>

            <div style={styleDiv2}>
                <div>
                    <HomeIcon fontSize="medium" />
                    <p style={styleDiv2.p}>Overview</p>
                </div>
                <div>
                    <Link to="/categories" className={classes.links}>
                        <WidgetsIcon fontSize="medium" />
                        <p style={styleDiv2.p}>Categories</p></Link>
                </div>
                <div>
                    <Link to="/statistics" className={classes.links}>
                        <EqualizerIcon fontSize="medium" />
                        <p style={styleDiv2.p}>Statistics</p></Link>
                </div>
                {<AddEntries />}
            </div>
        </Box>

    );
}
