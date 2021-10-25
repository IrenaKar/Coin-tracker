import React from "react";
import { Box, List, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ListEntries from "./ListEntries";
import ListIncome from "./ListIncome";
import ListExpences from "./ListExpences";
import Header from "./Header";
import Menu from "./Menu";

const useStyles = makeStyles((theme) => ({

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
    margin: {
        marginTop: "40px"
    },
    marginBottom: {
        marginBottom: "100px"

    }

}));



export default function Overview() {

    const classes = useStyles();

    return (

        <Box >
            <Header />

            <div>

                <Paper className={classes.margin} elevation={6}>
                    <Typography className={classes.header}>
                        Income
                    </Typography>

                    <List>
                        <ListIncome />
                    </List>

                </Paper>
                <Paper className={classes.margin}  elevation={6} >
                    <Typography className={classes.header}>
                        Expences
                    </Typography>

                    <List>
                        <ListExpences />
                    </List>

                </Paper>
                <Paper className={classes.margin}  elevation={6}>
                    <Typography className={classes.header}>
                        Entries
                    </Typography>


                    <List  className={classes.marginBottom} >
                        <ListEntries />

                    </List>

                </Paper>
            </div>
<Menu/>

        </Box>

    );
}
