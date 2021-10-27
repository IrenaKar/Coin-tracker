import { Box, Dialog, Paper, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react';
import AddEditCategory from './AddCategory';
import { Context } from '../../../Provider';
import Header from '../Overview.jsx/Header';
import Menu from '../Overview.jsx/Menu';



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

    margin: {
        marginTop: "20px"
    },

}));


export default function Categories() {
    const classes = useStyles();
    const { checked, img } = useContext(Context)
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
            <Header />
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

                        const { id, icon, category, type, budget, currency } = item

                        const hasBudget = budget !== 0

                        return <ListItem className={type === "income" ? classes.incomeStyle : classes.expenseStyle} key={id} id={id} button onClick={() => {
                            handleClick(item)
                        }}>
                            <ListItemIcon>
                                <Icon >{icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={`${type} ${category}`} />
                            <ListItemText
                                style={{ textAlign: 'right' }}
                                primary={hasBudget ? (`${budget} ${currency}`) : ''}
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

            <Menu />
        </Box>
    )
}


