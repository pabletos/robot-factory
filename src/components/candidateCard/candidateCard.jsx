import React from 'react';
import SuspenseImage from '../suspenseImage/suspenseImage';
import './candidateCard.css';

function CandidateCard(props) {
    const { robot } = props;
    return (
        <div data-id={robot.id} className="candidate-card slide-bottom" draggable="true" onDragStart={props.onDragStart}>
            <h2>
                { robot.name } { robot.surname }
            </h2>
            {//<img alt={robot.name} src={ robot.imageUrl } draggable="false"/>
            }
            <SuspenseImage alt={robot.name} src={ robot.imageUrl } draggable="false"/>
            {/*<p>{ robot.desc }</p>*/}
            <div className="body">
                <div className="title">{  robot.specialization.title }</div>
                <ul className="stats">
                    <li>
                        <span>R. resources</span>
                        <progress className="send-bar" value={robot.stats.hrDirector.value}></progress>
                    </li>
                    <li>
                        <span>Robotting</span>
                        <progress className="send-bar" value={robot.stats.rChief.value}></progress>
                    </li>
                    <li>
                        <span>Selling</span>
                        <progress className="send-bar" value={robot.stats.ceo.value}></progress>
                    </li>
                    <li>
                        <span>Transport</span>
                        <progress className="send-bar" value={robot.stats.transport.value}></progress>
                    </li>
                </ul>
                <div className="cost">{ robot.cost }$</div>
            </div>
        </div>
    )
}

export default CandidateCard;