import React, { Fragment } from 'react'
import { useMediaQuery } from '@mui/material';
import logo from "/logoTemp.webp"
import "./components.css"
const colors = ['#EDC208', '#D7194A', '#0AA64D', '#0367A6', '#C63CA2'];


/**
 * Generates an array of intermediate colors by interpolating between colors in the provided array.
 * It creates a smooth transition between colors by calculating intermediate RGB values.
 * 
 * @param {string[]} colors - An array of hex color strings to be expanded.
 * @param {number} steps - The number of intermediate colors desired between each color in the input array.
 * @returns {string[]} An expanded array of hex color strings including the original colors and the generated intermediate colors.
 */
function generateIntermediateColors(colors, steps) {
    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }
    
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }
    
    function interpolateColor(color1, color2, factor) {
        let result = color1.slice();
        for (let i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return result;
    }
    let intermediateColors = [];
    for (let i = 0; i < colors.length - 1; i++) {
        let startColor = hexToRgb(colors[i]);
        let endColor = hexToRgb(colors[i + 1]);
        intermediateColors.push(colors[i]);
        for (let j = 1; j <= steps; j++) {
            let factor = j / (steps + 1);
            let interColor = interpolateColor(startColor, endColor, factor);
            intermediateColors.push(rgbToHex(...interColor));
        }
    }
    intermediateColors.push(colors[colors.length - 1]);
    return intermediateColors;
}



/**
 * Logo component that renders a stylized logo using a palette of colors.
 * It splits the word "Color" into individual letters and applies different colors to each one.
 * Below the text, it displays a line of small color blocks from the expanded color palette.
 * 
 * @returns {JSX.Element} A JSX element representing the company logo with colored text and a line of color blocks.
 */
export default function Logo({ imgSize }) {
    
    const wordColor = 'Color'.split('').map((letter, index) => (
        <span key={index} style={{ textShadow: '-0.5px 0.5px 2.5px rgba(0, 0, 0, 0.75)', color: colors[index] }}>{letter}</span>
    ));
    const isMobileOrTablet = useMediaQuery('(max-width: 960px)');
    const expandedPalette = generateIntermediateColors(colors, isMobileOrTablet ? 1:3);
    
    return (
        <div className='fondo'>
            <div className='fragmentLogo'  style={isMobileOrTablet ?{margin:'0px', marginTop:'10px'}:{}}>
                {!isMobileOrTablet && < img src={logo} loading='lazy' style={{ borderRadius: "6px" }} height={imgSize ? imgSize : '60px'} alt="logo" />}
                <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Arial, sans-serif', fontSize: '32px' }}>
                    <div style={{
                        position: "relative", top: "-9px", fontFamily: "Pacifico, cursive",
                        fontWeight: "400px", fontStyle: "normal"
                    }}>{wordColor} </div>
                    <span style={{
                        textShadow: '-0.5px 0.5px 2.5px rgba(0, 0, 0, 0.75)',
                        position: "relative", top: "8px", color: '#0367A6', margin: "4px", fontFamily: "Pacifico, cursive",
                        fontWeight: "400px", fontStyle: "normal",
                    }}> Lucy</span>
                </div>
            </div>
            <div className='colorBlocks'>
                {expandedPalette.map((color, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: color,
                            width: '15px',
                            height: '4px',
                            marginRight: '2px',
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
