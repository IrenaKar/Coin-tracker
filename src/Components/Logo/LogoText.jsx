import React from 'react';
import Logo from "../Logo/logo-text.png"

const stylesImg = {
    display: "block",
    width: "100%",
}

const styleDiv = {
    width: "200px",
    marginLeft: "auto",
    marginRight: "auto",
}



export default function LogoText() {
    return (
        <div>
            <div style={styleDiv}>
                <img style={stylesImg} src={Logo} alt="" />
            </div>
        
        </div>
    )
}
