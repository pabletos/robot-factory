import React from 'react';
import './workBar.css';

function WorkBar(props) {
    return (
        <div className="work-bar">
            <div className="primary btn" onClick={props.onClick}>Assemble!</div>
            <div className="robot-counter">
                <h2>Robots</h2>
                <div className="total">{ props.total }</div>
            </div>
        </div>
    )
}

export default WorkBar;