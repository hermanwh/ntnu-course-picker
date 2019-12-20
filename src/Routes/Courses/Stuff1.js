import React, { useEffect, useState } from "react";
import "./Stuff1.css";
import Plot from 'react-plotly.js';

import { ButtonToolbar, Button} from "react-bootstrap";
import SubjectListing from "../../Components/Subject/SubjectListing";

import { terms, specializationNames, specializations, topicNames, topics, courses } from './../../shared/Constants/Constants.js'

const Stuff1 = props => {
    const [currentSpecialization, setCurrentSpecialization] = useState(null)
    const [currentTopics, setCurrentTopics] = useState([]);
    const [currentCourses, setCurrentCourses] = useState([]);
    const [exchangeAutumn, setExchangeAutumn] = useState(false);
    const [exchangeSpring, setExchangeSpring] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState({});
    const [topicCount, setTopicCount] = useState({});

    if (currentTopics.length < 1) {
        setCurrentTopics(topics);
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

    function addSelCourse(course, year) {
        addCourse(course);
        addSelectedCourse(course, year);
    }

    function addSelectedCourse(course, year) {
        let selCourses = selectedCourses;
        let index = year*2 + course.term;
        console.log("Index:", index);
        if (selCourses[index] === undefined) {
            selCourses[index] = [];
        }
        selCourses[index].push(course)
        setSelectedCourses(selCourses);
        console.log(selectedCourses);
    }

    function toggleSpring()  {
        const bool = exchangeSpring;
        setExchangeSpring(!bool);
    }

    function toggleAutumn() {
        const bool = exchangeAutumn;
        setExchangeAutumn(!bool);
    }

    function selectedCoursesContent(index) {
        let content = [];
        if (selectedCourses[index] !== undefined) {
            selectedCourses[index].slice(0, 4).forEach(course => (
                content.push(<p>{course.name} {course.subname}</p>)
            ));
        }
        const maxlen = index == 4 ? 2 : 4;
        while (content.length < maxlen) {
            content.push(<p>Empty slot</p>);
        }
        return content;
    }

    console.log(currentCourses.map(x => x.topics).flat().reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()))

    function addTopicsToSummary() {
        let content = [];
        currentCourses.map(x => x.topics)
                                        .flat()
                                        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
                                        .forEach((value, key) => (
                                            content.push(<p>{topicNames[key]}: {value}</p>)
                                        ));
        return content;
    }

    function addTopicsToSummaryGraph() {
        let content = [];
        currentCourses.map(x => x.topics)
                                        .flat()
                                        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
                                        .forEach((value, key) => (
                                            content.push([topicNames[key], value])
                                        ));
        return content;
    }

    currentCourses.map(x => x.topics).flat().reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()).forEach((key, value) => console.log(key, value))

    return (
        <div>
            <div className="container-fluid headerContent">
                <div className="row">
                    <div className="col-lg-12 headerDiv">
                    <p>Exchange autumn: {exchangeAutumn}</p><button onClick={() => toggleAutumn()}>{exchangeAutumn ? "On" : "Off"}</button>
                    </div>
                    <div className="col-lg-12 headerDiv" style={{'margin-top': '20px'}}>
                    <p>Exchange spring: {exchangeSpring}</p><button onClick={() => toggleSpring()}>{exchangeSpring ? "On" : "Off"}</button>
                    </div>
                    <div className="col-lg-12" style={{'margin-top': '20px'}}>
                    <p>Active courses</p>
                    <p>{currentCourses.map(x => x.name).join(", ")}</p>
                    </div>
                </div>
                <div className="row" style={{'margin-top': '20px'}}>
                    <div className="col-lg-4">
                        <h3>3. klasse</h3>
                        <div className="row">
                            <div className="col-lg-6 semesterBox">
                                <h4>høst</h4>
                                {
                                    selectedCoursesContent(0)
                                }
                            </div>
                            <div className="col-lg-6 semesterBox">
                                <h4>vår</h4>
                                {
                                    selectedCoursesContent(1)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h3>4. klasse</h3>
                        <div className="row">
                            <div className="col-lg-6 semesterBox">
                                <h4>høst</h4>
                                {!exchangeAutumn && (
                                    selectedCoursesContent(2)
                                )}
                                {exchangeAutumn && (
                                    <div>
                                    <input type="text" defaultValue="Subject 1" /><br></br>
                                    <input type="text" defaultValue="Subject 2" /><br></br>
                                    <input type="text" defaultValue="Subject 3" /><br></br>
                                    <input type="text" defaultValue="Subject 4" />
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-6 semesterBox">
                                <h4>vår</h4>
                                {!exchangeSpring && (
                                    selectedCoursesContent(3)
                                )}
                                {exchangeSpring && (
                                    <div>
                                    <input type="text" defaultValue="Subject 1" /><br></br>
                                    <input type="text" defaultValue="Subject 2" /><br></br>
                                    <input type="text" defaultValue="Subject 3" /><br></br>
                                    <input type="text" defaultValue="Subject 4" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h3>5. klasse</h3>
                        <div className="row">
                            <div className="col-lg-6 semesterBox">
                                <h4>høst</h4>
                                <p>prosjektoppgave (15stp)</p>
                                {
                                    selectedCoursesContent(4)
                                }
                                <p><br></br></p>
                            </div>
                            <div className="col-lg-6 semesterBox">
                                <h4>vår</h4>
                                <p>masteroppgave (30stp)</p>
                                <p><br></br></p>
                                <p><br></br></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid summaryContent">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <h4>Total of each topic:</h4>
                                {
                                    addTopicsToSummary()
                                }
                            </div>
                            <div className="col-6">
                                <Plot
                                    data={[
                                    {type: 'bar', x: addTopicsToSummaryGraph().map(x => x[0]), y: addTopicsToSummaryGraph().map(x => x[1])},
                                    ]}
                                    layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <div className="specializationsDiv">
                <ButtonToolbar>
                    {
                        specializations.map(specialization => (
                            <button className="btn-spec" onClick={() => addSpecialization(specialization)} value={specializationNames[specialization]}>{specializationNames[specialization]}</button>
                            ))
                        }
                </ButtonToolbar>
            </div>
            <div className="topicsDiv">
                <ButtonToolbar>
                    {
                        topics.map(topic => (
                            <button className="btn-top" onClick={() => addTopic(topic)} value={topicNames[topic]}>{topicNames[topic]}</button>
                        ))
                    }
                </ButtonToolbar>
            </div>
            
            <p>Active specialization: {specializationNames[currentSpecialization]}</p>
            <p>Active topic(s): {currentTopics.map(x => topicNames[x]).join(", ")}</p>

            <div className="container">
                <div class="row">
                    {Object.values(courses).filter(x => x.topics.some(y => currentTopics.indexOf(y) >= 0)).sort((a,b) => (a.name > b.name) ? 1 : -1).map(course => (
                        <div className="courseBox col-md-3" onClick={() => addCourse(course)}>
                            <SubjectListing
                            data={course}
                            />
                            <button className="btn-opt" onClick={() => addSelCourse(course, 0)} value="3">+3</button>
                            <button className="btn-opt" onClick={() => addSelCourse(course, 1)} value="4">+4</button>
                            <button className="btn-opt" onClick={() => addSelCourse(course, 2)} value="5">+5</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  );
};
export default Stuff1;