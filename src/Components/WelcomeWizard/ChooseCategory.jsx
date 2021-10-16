import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Icon, Typography } from '@material-ui/core';
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
        marginTop: "30px",
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
        alignSelf: "flex-end",
    },
    colorListItem: {
        color: "black"
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
                Choose what you spend money on
            </Typography>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <List component="nav" aria-label="main mailbox folders">
                    {list.map((item, index) => {
                        return (
                            <Fragment>
                                <ListItem button id={item.id} key={index}

                                >
                                    <ListItemIcon classes={{ root: classes.colorListItem }}>
                                        <Icon>
                                            {item.icon}
                                        </Icon>
                                    </ListItemIcon>
                                    <ListItemIcon>
                                        <FormControlLabel
                                        label={item.category}
                                            classes={{ root: classes.colorListItem }}
                                            control={
                                                <Checkbox />
                                            }
                                            key={index}
                                            id={item.id}
                                            onClick={() => clickHandler(item)}
                                        />
                                     
                                    </ListItemIcon>

                                </ListItem>
                                <Divider />

                            </Fragment>
                        );

                    })}

                </List>

            </FormControl>

            <Button disabled={!checked.length} onClick={handleRedirectBudget} fullWidth variant="contained" color="primary" className={classes.button}>
                done
            </Button>
        </Container>
    )
}

