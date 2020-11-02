import React from 'react';
import STRINGS from '../../utils/strings';
import StaffCard from '../staffCard/staffCard';
import SuspenseImage from '../suspenseImage/suspenseImage';
import './staffBar.css';

function StaffBar(props) {
    return(
        <div className="staff-bar slide-in-left">          
            <StaffCard 
                name={props.hrDirector ? props.hrDirector.name : null} 
                surname={props.hrDirector ? props.hrDirector.surname : null}
                title="RR Director"
                position="hrDirector"
                onDragOver={props.onDragOver}
                onDrop={props.onDrop}
                imageUrl={props.hrDirector ? props.hrDirector.imageUrl : null}
                statType={props.hrDirector ? props.hrDirector.stats.hrDirector.type : null}
                statValue={props.hrDirector ? props.hrDirector.stats.hrDirector.value : null}
            />
            <StaffCard 
                name={props.rChief ? props.rChief.name : null} 
                surname={props.rChief ? props.rChief.surname : null}
                title="Robotting Chief"
                position="rChief"
                onDragOver={props.onDragOver}
                onDrop={props.onDrop}
                imageUrl={props.rChief ? props.rChief.imageUrl : null}
                statType={props.rChief ? props.rChief.stats.rChief.type : null}
                statValue={props.rChief ? props.rChief.stats.rChief.value : null}
            />
            <StaffCard 
                name={props.ceo ? props.ceo.name : null} 
                surname={props.ceo ? props.ceo.surname : null}
                title="Seller Master"
                position="ceo"
                onDragOver={props.onDragOver}
                onDrop={props.onDrop}
                imageUrl={props.ceo ? props.ceo.imageUrl : null}
                statType={props.ceo ? props.ceo.stats.ceo.type : null}
                statValue={props.ceo ? props.ceo.stats.ceo.value : null}
            />
            <StaffCard 
                name={props.transport ? props.transport.name : null} 
                surname={props.transport ? props.transport.surname : null}
                title="Transport Tyccoon"
                position="transport"
                onDragOver={props.onDragOver}
                onDrop={props.onDrop}
                imageUrl={props.transport ? props.transport.imageUrl : null}
                statType={props.transport ? props.transport.stats.transport.type : null}
                statValue={props.transport ? props.transport.stats.transport.value : null}
            />
        </div>
    )
}

export default StaffBar;