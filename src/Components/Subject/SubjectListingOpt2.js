import React from "react";
import "./SubjectListingOpt2.css";
import ReactTooltip from 'react-tooltip';

import { 
    terms,
} from "./../../shared/Constants/Constants.js";

import {
    courses as allCourses,
} from './../../shared/Constants/Courses.js'

import {
    topicColors,
    topicNames,
} from './../../shared/Constants/Topics.js';

const SubjectListingOpt2 = props => {
    return (
        <div style={{'overflow':'hidden', 'whiteSpace': 'nowrap', 'textOverflow':'ellipsis', 'paddingTop':'3px'}}>
            <div data-tip data-for={props.data.name}>
                <a href={"https://www.ntnu.no/studier/emner/" + props.data.name} rel="noopener noreferrer" target="_tab" >
                    <p style={{'overflow':'hidden', 'whiteSpace': 'nowrap', 'textOverflow':'ellipsis'}} className="courseName-opt2">
                        {props.data.name} {props.data.subname}, {terms[props.term]}
                    </p>
                </a>
            </div>
            <ReactTooltip place="left" className='extraClass' delayHide={100} id={props.data.name} aria-haspopup='true' role='example' effect="solid">
                <p>{props.data.subname} ({terms[props.term]})</p>
                <p>Anbefalt forkunnskap:</p>
                {props.data.prerequisites.length > 0 && (
                    <ul>
                        {
                            props.data.prerequisites.map(prereq => (
                                <li key={props.data.name + prereq} className={props.courses.includes(prereq.toUpperCase()) ? 'activeCourse' : ''}>{prereq.toUpperCase()}</li>
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

export default SubjectListingOpt2;