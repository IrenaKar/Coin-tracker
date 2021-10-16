import { Avatar, Box, Dialog, Paper, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react';
import AddEditCategory from './AddCategory';
import { Context } from '../../../Provider';
import Logo from '../../Logo/Logo';
import HomeIcon from "@material-ui/icons/Home";
import WidgetsIcon from "@material-ui/icons/Widgets";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AddEntries from '../Overview.jsx/AddEntries';
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(100),
            height: theme.spacing(40),
        }
    },
    header: {
        textAlign: 'left',
        background: theme.palette.grey[200],
        padding: theme.spacing(2)
    },
    expenseStyle: {
        color: "red"
    },
    incomeStyle: {
        color: "#03dac5"
    },
    bgColor: {
        backgroundColor: "lightGray",
        height: '30px',
        color: "darkGray",
        fontSize: "20px",
        padding: "10px",
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px"

    },
    links: {
        color: "white",
        textDecoration: "none"
    },
    margin: {
        marginTop: "20px"
    },
    incomeStyle: {
        color: "#03dac5"
    },
    expenseStyle: {
        color: "red"
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

}

export default function Categories() {
    const classes = useStyles();
    const { categories, checked, img } = useContext(Context)
    const [open, setOpen] = useState(false)
    const [item, setItem] = useState(null)

    const handleClick = (_item) => {
        setOpen(true)
        setItem(_item)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box>
            <div style={styleDiv1}>
                <div style={styleDiv1.flex}>
                    <div style={styleDiv1.div}>
                        <Logo />                     </div>
                    <h2 style={styleDiv1.h2}>Overview</h2>
                </div>
                {img.map((el) => {
                    return (
                        <Avatar>
                            <img
                                src={el.picture.thumbnail}
                                alt="random image"
                                key={el.picture}
                            />
                        </Avatar>

                    )
                })}
            </div>
            <Paper className={classes.margin} elevation={6}>
                <Typography className={classes.header} variant="h6" component="h6">
                    Categories
                </Typography>

                <List>
                    <ListItem button onClick={() => {
                        handleClick()
                    }}>
                        <ListItemIcon>
                            <Icon>{'add'}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={'Add new category'} />
                    </ListItem>

                    {checked.map((item) => {
                        const { id, icon, category, type, budget } = item

                        const hasBudget = budget !== 0
console.log(checked)
                        return <ListItem className={type === "income" ? classes.incomeStyle : classes.expenseStyle} key={id} button onClick={() => {
                            handleClick(item)
                        }}>
                            <ListItemIcon>
                                <Icon >{icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={type + category} />
                            <ListItemText
                                style={{ textAlign: 'right' }}
                                primary={hasBudget ? budget : ''}
                                secondary={!hasBudget ? '' : type === 'income' ? 'planned' : 'budget'} />
                        </ListItem>
                    }

                    )}

                </List>
            </Paper>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <AddEditCategory handleClose={handleClose} category={item} />
            </Dialog>

            <div style={styleDiv2}>
                <div>
                    <Link to="overview" className={classes.links}>
                        <HomeIcon fontSize="medium" />
                        <p style={styleDiv2.p}>Overview</p></Link>
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
    )
}


