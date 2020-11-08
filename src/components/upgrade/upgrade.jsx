import React from 'react';
import './upgrade.css';

function Upgrade(props) {
    return (
        <div className={props.active ? "upgrade active" : "upgrade"}>
            <div className="upgrade-img">
                <img alt={props.name} src={props.image}/>
            </div>
            <div className="upgrade-body">
                <div className="title">{props.name}</div>
                <div className="price">{props.price}$</div>
                <div className="desc">{props.desc}</div>
                { !props.active ? 
                    <div className="tertiary btn btn-buy" onClick={props.onBuy}>Buy!</div>
                    :
                    <div className="tertiary btn btn-buy disabled">Already bought!</div>
                }
            </div>
        </div>
    )
}

export default React.memo(Upgrade);