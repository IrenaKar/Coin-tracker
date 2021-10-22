import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import HomeIcon from "@material-ui/icons/Home";
import WidgetsIcon from "@material-ui/icons/Widgets";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AddEntries from "./AddEntries";


const useStyles = makeStyles((theme) => ({

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
export default function Menu() {
    const classes = useStyles();

    return (
        <div style={styleDiv2}>
            <div>
                <Link to="/overview" className={classes.links}>
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
    )
}
