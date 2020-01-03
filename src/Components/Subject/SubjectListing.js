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
                <p>Anbefalt forkunnskap:</p>
                {props.data.prerequisites.length > 0 && (
                    <ul>
                        {
                            props.data.prerequisites.map(prereq => (
                                <li className={props.courses.includes(prereq.toUpperCase()) ? 'activeCourse' : ''}>{prereq.toUpperCase()}</li>
                            ))
                        }
                    </ul>
                )}
                {props.data.prerequisites.length == 0 && (
                    <ul>
                        <li className="activeCourse">Ingen</li>
                    </ul>
                )
                    
                }
                
            </ReactTooltip>
       </div>
    )
}

export default SubjectListing;