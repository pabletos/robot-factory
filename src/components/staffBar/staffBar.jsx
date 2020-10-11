import React from 'react';
import STRINGS from '../../utils/strings';
import SuspenseImage from '../suspenseImage/suspenseImage';
import './staffBar.css';

function StaffBar(props) {
    return(
        <div className="staff-bar slide-in-left">
            <div className="staff-item" onDrop={(e) => props.onDrop(e, 'hrDirector')} onDragOver={props.onDragOver}>
                <h3>RR Director</h3>
                {props.hrDirector ? 
                    <h4 className="name">{ props.hrDirector.name } { props.hrDirector.surname }</h4>
                    :
                    <h4 className="unassigned">not assigned</h4>
                }
                <div className="staff-slot">
                    { props.hrDirector &&
                        <SuspenseImage alt="Robot Resources Director" src={ props.hrDirector.imageUrl }></SuspenseImage>
                    }
                </div>
                <div className="ability">
                    { props.hrDirector ?
                        STRINGS['TYPES']['hrDirector'][props.hrDirector.stats.hrDirector.type].replace('${v}', Math.floor(props.hrDirector.stats.hrDirector.value * 10)) 
                        :
                        ''
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
                        <SuspenseImage alt="Robotting Chief" src={ props.rChief.imageUrl }></SuspenseImage>
                    }
                </div>
                <div className="ability">
                    { props.rChief ?
                        STRINGS['TYPES']['rChief'][props.rChief.stats.rChief.type].replace('${v}', Math.floor(props.rChief.stats.rChief.value * 10)) 
                        :
                        ''
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
                        <SuspenseImage alt="Seller Master" src={ props.ceo.imageUrl }></SuspenseImage>
                    }
                </div>
                <div className="ability">
                    { props.ceo ?
                        STRINGS['TYPES']['ceo'][props.ceo.stats.ceo.type].replace('${v}', Math.floor(props.ceo.stats.ceo.value * 10)) 
                        :
                        ''
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
                        <SuspenseImage alt="Transport Tycoon" src={ props.transport.imageUrl }></SuspenseImage>
                    }
                </div>
                <div className="ability">
                    { props.transport ?
                        STRINGS['TYPES']['transport'][props.transport.stats.transport.type].replace('${v}', Math.floor(props.transport.stats.transport.value * 10)) 
                        :
                        ''
                    }
                </div>
            </div>
        </div>
    )
}

export default StaffBar;