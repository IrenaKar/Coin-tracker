import { Button, Fab, Tooltip } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({

    buttonMargin: {
        marginTop: "-60px"
    },
    btnColor: {
        backgroundColor: "#03dac5",
        color: "black"

    },
    position: {
        position: "absolute",
        bottom: "130%",
        right: "10%"
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

}));
export default function ToolTip() {
    const [show, setShow] = useState(false);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <>
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
        </>

    )
}
