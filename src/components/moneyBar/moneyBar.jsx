import React from 'react';
import './moneyBar.css';

function MoneyBar(props) {
    return (
        <div className="money-bar">
            <div className="money-counter">
                <h2>Cash</h2>
                <div className="total">{ props.total }$</div>
            </div>
            <div className={props.robots >= props.min ? "tertiary btn" : "tertiary btn disabled"} onClick={props.onClick}>Sell!</div>      
        </div>
    )
}

export default MoneyBar;