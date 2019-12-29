import React from "react";
import "./SubjectListing.css";
import ReactTooltip from 'react-tooltip';

import { 
    terms,
} from "./../../shared/Constants/Constants.js";

import {
    topicColors,
    topicNames,
} from './../../shared/Constants/Topics.js';

const SubjectListing = props => {
    return (
        <div>
            <div data-tip data-for={props.data.name}>
                <a href={"https://www.ntnu.no/studier/emner/" + props.data.name} rel="noopener noreferrer" target="_tab"><p className="courseName">{props.data.name}</p></a>
                <p className="courseSubname">{props.data.subname}</p>
                <p className="courseTerm">{terms[props.data.term]}</p>
            </div>
            <div>
                <div className="courseTopics">{props.data.topics.map(topic => (
                    <div className="topicsDiv">
                        <span data-tip data-for={props.data.name + "-" + topic} className="dot" style={{'background-color':topicColors[topic]}}></span>
                        <ReactTooltip id={props.data.name + "-" + topic} aria-haspopup='true' role='example' effect="solid">
                            <p>{topicNames[topic]}</p>
                        </ReactTooltip>
                    </div>
                ))}</div>
            </div>
            <ReactTooltip place="top" className='extraClass' delayHide={150} id={props.data.name} aria-haspopup='true' role='example' effect="solid">
                <p>This is a global react component tooltip</p>
                <p>You can put every thing here</p>
                <ul>
                <li>Word</li>
                <li>Chart</li>
                <li>Else</li>
                </ul>
            </ReactTooltip>
       </div>
    )
}

export default SubjectListing;