import {
    Button, Checkbox, DialogActions,
    DialogContent, DialogTitle, FormControl,
    FormControlLabel, InputLabel, makeStyles, MenuItem,
    Select, TextField
} from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { categoryIcons } from '../../Data/CategoryIcons'
import Icon from '@material-ui/core/Icon';
import { Context } from '../../../Provider';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2, 0)
    },
}));

export default function AddEditCategory({ handleClose, category }) {

    const [item, setItem] = useState(category || {
        type: '',
        isEnabled: true,
        category: '',
        budget: 0,
        icon: categoryIcons[0],
        id: new Date().valueOf(),
    })

    
    const { categories, addCategory, updateCategory } = useContext(Context)

    const classes = useStyles();
 
    const isEditing = !!category?.id


    const allUniqueIcons = [...new Set(categoryIcons.concat(categories.map(c => c.icon)))]


    return (
        <>
            <DialogTitle>{`${isEditing ? 'Edit' : 'Add'} Category`}</DialogTitle>
            <form onSubmit={(e) => {
                e.preventDefault()
                isEditing ? updateCategory(item) : addCategory(item)
                handleClose()
            }}>
                <DialogContent>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="type"
                                    value={item.type}
                                    label="type-label"
                                    onChange={(e) => {
                                        setItem({ ...item, type: e.target.value })
                                    }}
                                >
                                    <MenuItem value={"income"}>Income</MenuItem>
                                    <MenuItem value={"expence"}>Expence</MenuItem>
                                </Select>
                            </FormControl>

                    <FormControl className={classes.formControl} variant="outlined" fullWidth>
                        <TextField
                            label="Name"
                            variant="outlined"
                            required
                            value={item.category || ''}
                            onChange={(e) => {
                                setItem({ ...item, category: e.target.value })
                            }} />
                    </FormControl>

                    <FormControl className={classes.formControl} variant="outlined" fullWidth>
                        <InputLabel id="icon-label">Icon</InputLabel>
                        <Select
                            labelId="icon-label"
                            value={item.icon || 'color_lens'}
                            onChange={(e) => {
                                setItem({ ...item, icon: e.target.value })
                            }}
                            label="Icon"
                        >
                            {allUniqueIcons.map(icon =>
                                <MenuItem key={icon} value={icon}>
                                    <Icon>{icon}</Icon>
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl} variant="outlined" fullWidth>
                        <TextField
                            label="Budget"
                            variant="outlined"
                            value={item.budget || 0}
                            onChange={(e) => {
                                setItem({ ...item, budget: e.target.value })
                            }} />
                    </FormControl>

                    <FormControl className={classes.formControl} variant="outlined" fullWidth>
                        <FormControlLabel
                            value="start"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={item.isEnabled}
                                    onChange={(e) => {
                                        setItem({ ...item, isEnabled: e.target.checked })
                                    }} />
                            }
                            label="Enabled"
                            labelPlacement="start"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type={'submit'} color="primary" autoFocus>
                        {`${isEditing ? 'Update' : 'Add'}`}
                    </Button>
                </DialogActions>
            </form>
        </>
    )
}
