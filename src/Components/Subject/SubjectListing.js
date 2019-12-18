import React from "react"
import { terms, specializationNames, specializations, topicNames, topics } from "./../../shared/Constants/Constants.js"
import "./SubjectListing.css";

const SubjectListing = props => {
    return (
        <div className="">
            <h4>{props.data.name}</h4>
            <p>{props.data.subname}</p>
            <p>{props.data.topics.join(", ")}</p>
            <p>{terms[props.data.term]}</p>
        </div>
    )
}

export default SubjectListing;