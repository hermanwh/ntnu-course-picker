import React from "react"
import "./SubjectListing.css";

import { 
    terms,
} from "./../../shared/Constants/Constants.js";

import {
    topicColors,
} from './../../shared/Constants/Topics.js';

const SubjectListing = props => {
    return (
        <div>
            <a href={"https://www.ntnu.no/studier/emner/" + props.data.name} rel="noopener noreferrer" target="_tab"><p className="courseName">{props.data.name}</p></a>
            <p className="courseSubname">{props.data.subname}</p>
            <p className="courseTopics">{props.data.topics.map(topic => (
                <span className="dot" style={{'background-color':topicColors[topic]}}></span>
            ))}</p>
            <p className="courseTerm">{terms[props.data.term]}</p>
        </div>
    )
}

export default SubjectListing;