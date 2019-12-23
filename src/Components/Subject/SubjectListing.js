import React from "react"
import { terms, specializationNames, specializations, topicNames, topics, topicColors } from "./../../shared/Constants/Constants.js"
import "./SubjectListing.css";

const SubjectListing = props => {
    return (
        <div>
            <p className="courseName">{props.data.name}</p>
            <p className="courseSubname">{props.data.subname}</p>
            <p className="courseTopics">{props.data.topics.map(topic => (
                <span className="dot" style={{'background-color':topicColors[topic]}}></span>
            ))}</p>
            <p className="courseTerm">{terms[props.data.term]}</p>
        </div>
    )
}

export default SubjectListing;