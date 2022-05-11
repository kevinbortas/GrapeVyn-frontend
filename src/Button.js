import React from "react";
import './css/Button.css';

const STYLES = [
    'btn--primary',
    'btn--large',
]

const SIZES = [
    'btn--medium',
    'btn--large',
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
}) => {

    const checkButtonStyles = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = STYLES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <button className={`btn ${checkButtonStyles} ${checkButtonSize}`} onClick={onClick}
        type={type}>
        {children}
        </button>
    )
}