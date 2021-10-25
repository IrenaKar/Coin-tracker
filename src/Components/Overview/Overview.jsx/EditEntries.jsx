import React, { useContext, useState } from 'react'
import { Context } from '../../../Provider'
import { categoryIcons } from '../../Data/CategoryIcons'
import { makeStyles } from "@material-ui/core/styles";
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, Icon, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';



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



export default function EditEntries({ handleClose, entry }) {

    const [item, setItem] = useState(entry || {
        type: '',

        category: '',
        amount: 0,
        icon: categoryIcons[0],
        id: new Date().valueOf(),
        date: new Date(),

    })
    const { checked, entries, updateEntry } = useContext(Context)


    const classes = useStyles();

    const icons = [...new Set(categoryIcons.concat(entries.map(c => c.icon)))]
    const [selectedDate, setSelectedDate] = useState();

    return (
        <>
            <DialogTitle className={classes.formControl}>Edit Entry</DialogTitle>

            <form onSubmit={(e) => {
                e.preventDefault();
                updateEntry(item)

                handleClose()

            }}>
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
                            value={selectedDate}

                            onChange={(date) => {
                                setSelectedDate(date);
                            }}
                            format={"yyyy/MM/dd"}
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
                    <Button disabled={!item.category} type='submit' variant="contained" size="small" color="primary"> {'Edit'}</Button>
                </DialogActions>
            </form>
        </>
    )
}
