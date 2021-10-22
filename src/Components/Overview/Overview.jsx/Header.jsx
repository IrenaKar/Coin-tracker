import React, { useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Logo from '../../Logo/Logo';
import { Avatar } from '@material-ui/core';
import { Context } from '../../../Provider';

const useStyles = makeStyles((theme) => ({

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


export default function Header() {
    const classes = useStyles();
    const { img } = useContext(Context)

    return (
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
                        alt="random"
                        key={el.picture}
                    />
                </Avatar>

            )
        })}
    </div>
    )
}
