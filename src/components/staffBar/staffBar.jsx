import React from 'react';
import './staffBar.css';

function StaffBar(props) {
    return(
        <div className={"staff-bar"}>
            <div className="staff-item" onDrop={(e) => props.onDrop(e, 'hrDirector')} onDragOver={props.onDragOver}>
                <h3>RR Director</h3>
                {props.hrDirector ? 
                    <h4 className="name">{ props.hrDirector.name } { props.hrDirector.surname }</h4>
                    :
                    <h4 className="unassigned">not assigned</h4>
                }
                <div className="staff-slot">
                    { props.hrDirector &&
                        <img alt="Robot Resources Director" src={ props.hrDirector.imageUrl }></img>
                    }
                </div>
            </div>
            <div className="staff-item" onDrop={(e) => props.onDrop(e, 'rChief')} onDragOver={props.onDragOver}>
                <h3>Robotting Chief</h3>
                {props.rChief ? 
                    <h4 className="name">{ props.rChief.name } { props.rChief.surname }</h4>
                    :
                    <h4 className="unassigned">not assigned</h4>
                }
                <div className="staff-slot">
                    { props.rChief &&
                        <img alt="Robotting Chief" src={ props.rChief.imageUrl }></img>
                    }
                </div>
            </div>
            <div className="staff-item" onDrop={(e) => props.onDrop(e, 'ceo')} onDragOver={props.onDragOver}>
                <h3>Seller Master</h3>
                {props.ceo ? 
                    <h4 className="name">{ props.ceo.name } { props.ceo.surname }</h4>
                    :
                    <h4 className="unassigned">not assigned</h4>
                }
                <div className="staff-slot">
                    { props.ceo &&
                        <img alt="Seller Master" src={ props.ceo.imageUrl }></img>
                    }
                </div>
            </div>
            <div className="staff-item" onDrop={(e) => props.onDrop(e, 'transport')} onDragOver={props.onDragOver}>
                <h3>Transport Tycoon</h3>
                {props.transport ? 
                    <h4 className="name">{ props.transport.name } { props.transport.surname }</h4>
                    :
                    <h4 className="unassigned">not assigned</h4>
                }
                <div className="staff-slot">
                    { props.transport &&
                        <img alt="Transport Tycoon" src={ props.transport.imageUrl }></img>
                    }
                </div>
            </div>
        </div>
    )
}

export default StaffBar;