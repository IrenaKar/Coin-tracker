import React, { useState, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControl, Icon, InputLabel, MenuItem, Select, TextField, Tooltip } from '@material-ui/core';
import { Context } from '../../../Provider';
import AddIcon from '@material-ui/icons/Add';

import { TextareaAutosize } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { categoryIcons } from '../../Data/CategoryIcons';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({

    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(100),
            height: theme.spacing(40),
        },
    },

    margin: {
        margin: theme.spacing(2),
        paddingLeft: "80px",
        paddingRight: "80px",
        height: "50px",
    },

    buttonMargin: {
        marginTop: "-60px"
    },

    btnSmall: {
        backgroundColor: "#6200ee",
        marginBottom: "20px",
        width: "100%",
        display: "block",
        '&:hover': {
            padding: "10px",
        }
    },

    position: {
        position: "absolute",
        bottom: "130%",
        right: "10%"
    },
    flex: {
        display: 'flex',
        justifyContent: "space-between"
    },
    formControl: {
        marginBottom: "30px"
    },

    btnColor: {
        backgroundColor: "#03dac5",
        color: "black"

    }

}));

export default function AddEntries(entry) {
    const classes = useStyles();

    const [item, setItem] = useState(entry || {
        type: '',
 
        category: '',
        amount: 0,
        icon: categoryIcons[0],
        id: new Date().valueOf(),
    })


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const { checked, addEntry, updateEntry, entries } = useContext(Context)

    const [show, setShow] = useState(false);
    const isEditingEntry = !!entry?.id

    const icons = [...new Set(categoryIcons.concat(entries.map(c => c.icon)))]

    return (

            <div>
                <Tooltip
                    onClick={() => setShow((prev) => !prev)}
                    title="Add"
                    aria-label="add"
                >
                    <Fab classes={{ root: classes.btnColor }} aria-label="add" className={classes.buttonMargin}>

                        <AddIcon />

                    </Fab>

                </Tooltip>
                <div className={classes.position}>
                    {show && (
                        <Button
                            className={classes.btnSmall} color="secondary" variant="contained" size="small" type="button" onClick={handleOpen}
                        >
                            add entry
                        </Button>
                    )}

                    {/* {show && (
                    <Button
                        className={classes.btnSmall} color="secondary" variant="contained" size="small" type="button" onClick={handleOpen}
                    >
                        add expense
                    </Button>

                )} */}
                </div>
                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            isEditingEntry ? updateEntry(item) : addEntry(item)
                            handleClose()

                        }}>
                            <DialogTitle className={classes.formControl}>{`${isEditingEntry ? 'Edit' : 'Add'} Entry`}</DialogTitle>
                            <DialogContent>


                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="type"
                                        value={item.type || ''}
                                        label="type-label"
                                        onChange={(e) => {
                                            setItem({ ...item, type: e.target.value })
                                        }}
                                    >
                                        <MenuItem value={"income"}>Income</MenuItem>
                                        <MenuItem value={"expence"}>Expence</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" fullWidth className={classes.formControl}>

                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        autocomplete
                                        labelId="demo-simple-select-label"
                                        id="category"
                                        value={item.category || ''}
                                        label="category-label"
                                        onChange={(e) => {
                                            setItem({ ...item, category: e.target.value })
                                        }}
                                    >

                                        {checked.map((element) => {
                                            return (
                                                <MenuItem value={element.category}>{element.category}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                    <TextField
                                        type="number"
                                        label="Amount"
                                        variant="outlined"
                                        value={item.amount || ''}
                                        onChange={(e) => {
                                            setItem({ ...item, amount: e.target.value })
                                        }} />
                                </FormControl>
                                <FormControl variant="outlined" fullWidth className={classes.formControl}>

                                    <InputLabel id="demo-simple-select-label">Icon</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="icon"
                                        value={item.icon || ''}
                                        label="icon-label"
                                        onChange={(e) => {
                                            setItem({ ...item, icon: e.target.value })
                                        }}
                                    >
                                        {icons.map((icon) => {
                                            return (
                                                <MenuItem value={icon}><Icon>{icon}</Icon></MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>

                                    <KeyboardDatePicker
                                        clearable
                                        label="Start Date"
                                        id="startDate"
                                        selected={selectedDate}
                                        onChange={(date) => {
                                            setSelectedDate(date);
                                        }}
                                        format={"yyyy/MM/dd"}
                                        value={selectedDate}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl} style={{ width: "100%" }}>
                                    <TextareaAutosize
                                        value={item.desc}
                                        minRows={4}
                                        aria-label="maximum height"
                                        placeholder="Description (optional)"
                                        defaultValue=""
                                        style={{ width: "100%" }}
                                        onChange={(e) => {
                                            setItem({ ...item, desc: e.target.value })
                                        }}
                                    />
                                </FormControl>
                            </DialogContent>
                            <DialogActions className={classes.flex}>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button disabled={!item.category} type='submit' variant="contained" size="small" color="primary">  {`${isEditingEntry ? 'Update' : 'Add'}`}</Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                </div>

            </div>
      
    )
}

