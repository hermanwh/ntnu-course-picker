import React from "react";
import "./CourseSummary.css";


function courseContent(course) {
    return (<a href={"https://www.ntnu.no/studier/emner/" + course.name} rel="noopener noreferrer" target="_tab"><p>{course.name} {course.subname}</p></a>);
}

const CourseSummary = props => {
    console.log(props)
    return (
        <div className="col-lg-10 offset-lg-1 headerContent">
            <div className="row" style={{'marginTop': '20px'}}>
                <div className="col-lg-4">
                    <h3>3. klasse</h3>
                    <div className="row">
                        <div className="col-12 semesterBox">
                            <h4>høst</h4>
                            {
                                props.data.h0.map(x => courseContent(props.courses[x]))
                            }
                        </div>
                        <div className="col-12 semesterBox" style={{'marginTop':'20px'}}>
                            <h4>vår</h4>
                            {
                                props.data.v0.map(x => courseContent(props.courses[x]))
                            }
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <h3>4. klasse</h3>
                    <div className="row">
                        <div className="col-12 semesterBox">
                            <h4>høst</h4>
                            {
                                props.data.h1.map(x => courseContent(props.courses[x]))
                            }
                        </div>
                        <div className="col-12 semesterBox" style={{'marginTop':'20px'}}>
                            <h4>vår</h4>
                            {
                                props.data.v1.map(x => courseContent(props.courses[x]))
                            }
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <h3>5. klasse</h3>
                    <div className="row">
                        <div className="col-12 semesterBox">
                            <h4>høst</h4>
                            {
                                props.data.h2.map(x => courseContent(props.courses[x]))
                            }
                        </div>
                        <div className="col-12 semesterBox" style={{'marginTop':'20px'}}>
                            <h4>vår</h4>
                            {
                                props.data.v2.map(x => courseContent(props.courses[x]))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseSummary;