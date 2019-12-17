import React, { useEffect, useState } from "react";
import "./Stuff1.css";

import { ButtonToolbar, Button} from "react-bootstrap";
import SubjectListing from "../../Components/Subject/SubjectListing";

import { terms, specializationNames, specializations, topicNames, topics, courses } from './../../shared/Constants/Constants.js'

const Stuff1 = props => {
    const [currentSpecialization, setCurrentSpecialization] = useState(null)
    const [currentTopics, setCurrentTopics] = useState([])
    const [currentCourses, setCurrentCourses] = useState([])

    if (currentTopics.length < 1) {
        setCurrentTopics(topics)
    }

    function addSpecialization(specialization) {
        setCurrentSpecialization(specialization);
    }
    
    function addTopic(topic) {
        console.log(topic);
        const index = currentTopics.indexOf(topic);
        let topics = currentTopics.slice();
        if (index > -1) {
            topics.splice(index, 1);
            setCurrentTopics(topics);
        }
        else {
            topics.push(topic);
            setCurrentTopics(topics);
        }
    }

    function addCourse(course) {
        const index = currentCourses.indexOf(course);
        let courses = currentCourses.slice();
        if (index > -1) {
            courses.splice(index, 1);
            setCurrentCourses(courses);
        }
        else {
            courses.push(course);
            setCurrentCourses(courses);
        }
    }

    return (
        <div>
            <h1>Stuff1</h1>
            <br></br>
            <br></br>
            <p>Active courses: {currentCourses.map(x => x.name).join(", ")}</p>
            <br></br>
            <br></br>
            <div className="specializationsDiv">
                <ButtonToolbar>
                    {
                        specializations.map(specialization => (
                            <button onClick={() => addSpecialization(specialization)} value={specializationNames[specialization]}>{specializationNames[specialization]}</button>
                            ))
                        }
                </ButtonToolbar>
            </div>
            <div className="topicsDiv">
                <ButtonToolbar>
                    {
                        topics.map(topic => (
                            <button onClick={() => addTopic(topic)} value={topicNames[topic]}>{topicNames[topic]}</button>
                        ))
                    }
                </ButtonToolbar>
            </div>
            
            <p>Active specialization: {specializationNames[currentSpecialization]}</p>
            <p>Active topic(s): {currentTopics.map(x => topicNames[x]).join(", ")}</p>

            <div className="container">
                <div class="row">
                    {Object.values(courses).filter(x => x.topics.some(y => currentTopics.indexOf(y) >= 0)).sort((a,b) => (a.name > b.name) ? 1 : -1).map(course => (
                        <div className="courseBox col-md-4" onClick={() => addCourse(course)}>
                            <SubjectListing
                            data={course}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
  );
};
export default Stuff1;