import React from 'react';
import STRINGS from '../../utils/strings';
import SuspenseImage from '../suspenseImage/suspenseImage';
import './staffCard.css';

function StaffCard(props) {
    return (
        <div className="staff-item" onDrop={(e) => props.onDrop(e, props.position)} onDragOver={props.onDragOver}>
            <h3>{props.title}</h3>
            {props.name ? 
                <h4 className="name">{ props.name } { props.surname }</h4>
                :
                <h4 className="unassigned">not assigned</h4>
            }
            <div className="staff-slot">
                { props.imageUrl &&
                    <SuspenseImage src={ props.imageUrl }></SuspenseImage>
                }
            </div>
            <div className="ability">
                { props.statType ?
                    STRINGS['TYPES'][props.position][props.statType].replace('${v}', Math.floor(props.statValue * 10)) 
                    :
                    ''
                }
            </div>
        </div>
    )
}

export default React.memo(StaffCard);