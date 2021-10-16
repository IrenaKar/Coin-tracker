import React from 'react';
import LogoImg from "../Logo/logo.png"

const stylesImg = {
  display: "block",
  width: "100%",
}

export default function Logo() {
  return (
    <img style={stylesImg} src={LogoImg} alt="" />
  )
}
