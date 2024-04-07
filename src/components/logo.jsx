import React, { Fragment } from 'react'
import logo from "/logoTemp.webp"
import "./components.css"
export default function Logo() {
    const colors = ['#EDC208', '#D7194A', '#0AA64D', '#0367A6', '#C63CA2'];
    const wordColor = 'Color'.split('').map((letter, index) => (
        <span key={index} style={{ color: colors[index] }}>{letter}</span>
    ));
    return (
        <div className='fragmentLogo'>
            <img src={logo} loading='lazy' style={{ borderRadius: "6px" }} height={"60px"} alt="logo" />
            <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Arial, sans-serif', fontSize: '32px' }}>
                <div style={{
                    position: "relative", top: "-10px", fontFamily: "Pacifico, cursive",
                    fontWeight: "400px", fontStyle: "normal"
                }}>{wordColor} </div>
                <span style={{
                    position: "relative", top: "12px", color: '#0367A6', margin: "4px", fontFamily: "Pacifico, cursive",
                    fontWeight: "400px", fontStyle: "normal"
                }}> Lucy</span>
            </div>
        </div >
    )
}
