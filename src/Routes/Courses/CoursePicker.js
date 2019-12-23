import React, { useEffect, useState } from "react";
import "./CoursePicker.css";
import Plot from 'react-plotly.js';

import { ButtonToolbar, Button} from "react-bootstrap";
import SubjectListing from "../../Components/Subject/SubjectListing";
import Select from 'react-select';

import { terms,
    specializationNames,
    specializations,
    topicNames,
    topics,
    courses,
    specializationOptions,
    topicsOptions,
} from '../../shared/Constants/Constants.js'

const CoursePicker = props => {
    const [currentSpecialization, setCurrentSpecialization] = useState(null)
    const [currentTopics, setCurrentTopics] = useState([]);
    const [currentCourses, setCurrentCourses] = useState([]);
    const [exchangeAutumn, setExchangeAutumn] = useState(false);
    const [exchangeSpring, setExchangeSpring] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState({});
    const [topicCount, setTopicCount] = useState({});
    const [currentSearchText, setCurrentSearchText] = useState("");

    if (currentTopics.length < 1) {
        setCurrentTopics(topics);
    }

    /*
    function addSpecialization(specialization) {
        setCurrentSpecialization(specialization);
    }
    
    function addTopic(topic) {
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
    */

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

    function removeSelCourse(course) {
        addCourse(course);
        removeSelectedCourse(course);
    }

    function removeSelectedCourse(course) {
        let selCourses = selectedCourses;
        Object.keys(selCourses).forEach(function(key) {
            if (selCourses[key].includes(course)) {
                selCourses[key].splice( selCourses[key].indexOf(course), 1 );
            }
        })
        setSelectedCourses(selCourses);
    }

    function addSelectedCourse(course, year) {
        let selCourses = selectedCourses;
        let index = year*2 + course.term;
        if (selCourses[index] === undefined) {
            selCourses[index] = [];
        }
        
        selCourses[index].push(course)
        setSelectedCourses(selCourses);
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
            content.push(<p>Mangler emne</p>);
        }
        return content;
    }

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

    function topicsChanged(selectedTopics) {
        if (selectedTopics !== null) {
            setCurrentTopics(selectedTopics.map(x => x.value));
        }
    }

    function specializationChanged(selectedSpecialization) {
        setCurrentSpecialization(selectedSpecialization.value);
    }

    function inputChanged() {
        let asd = document.getElementById("freeTextInputId").value;
        setCurrentSearchText(asd);
    }

    // currentCourses.map(x => x.topics).flat().reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()).forEach((key, value) => console.log(key, value))
    // <p>Exchange spring: {exchangeSpring}</p><button onClick={() => toggleSpring()}>{exchangeSpring ? "On" : "Off"}</button>
    return (
        <div>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Aldrich" />
            <div className="container-fluid headerContent">
                <div className="row">
                    <div className="col-12">
                        <h3>Velg spesialisering</h3>
                        <Select onChange={(selectedOptions) => specializationChanged(selectedOptions)} options={specializationOptions} className="selectSpecialization" />
                    </div>
                    <div className="col-12" style={{'margin-top':'20px'}}>
                        <h3>Velg semester med utveksling</h3>
                        <div className="headerDiv">
                            <p>Høst: </p>
                            <label className="switch" style={{'margin-left':'5px', 'margin-top':'12px'}}>
                                <input type="checkbox" />
                                <span className="slider round" onClick={() => toggleAutumn()}/>
                            </label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <p>Vår:</p>
                            <label className="switch" style={{'margin-left':'5px', 'margin-top':'12px'}}>
                                <input type="checkbox" />
                                <span className="slider round" onClick={() => toggleSpring()}/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                <div className="row" style={{'margin-top': '20px'}}>
                    <div className="col-lg-4">
                        <h3>3. klasse</h3>
                        <div className="row">
                            <div className="col-12 semesterBox">
                                <h4>høst</h4>
                                {
                                    selectedCoursesContent(0)
                                }
                            </div>
                            <div className="col-12 semesterBox" style={{'margin-top':'20px'}}>
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
                            <div className="col-12 semesterBox">
                                <h4>høst</h4>
                                {!exchangeAutumn && (
                                    selectedCoursesContent(2)
                                )}
                                {exchangeAutumn && (
                                    <div>
                                        <input className="exchangeInput" type="text" defaultValue="Skriv inn fag..." />
                                        <input className="exchangeInput" type="text" defaultValue="Skriv inn fag..." />
                                        <input className="exchangeInput" type="text" defaultValue="Skriv inn fag..." />
                                        <input className="exchangeInput" type="text" defaultValue="Skriv inn fag..." />
                                    </div>
                                )}
                            </div>
                            <div className="col-12 semesterBox" style={{'margin-top':'20px'}}>
                                <h4>vår</h4>
                                {!exchangeSpring && (
                                    selectedCoursesContent(3)
                                )}
                                {exchangeSpring && (
                                    <div>
                                        <input className="exchangeInput" type="text" defaultValue="Skriv inn fag..." />
                                        <input className="exchangeInput" type="text" defaultValue="Skriv inn fag..." />
                                        <input className="exchangeInput" type="text" defaultValue="Skriv inn fag..." />
                                        <input className="exchangeInput" type="text" defaultValue="Skriv inn fag..." />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h3>5. klasse</h3>
                        <div className="row">
                            <div className="col-12 semesterBox">
                                <h4>høst</h4>
                                <p>prosjektoppgave (15stp)</p>
                                {
                                    selectedCoursesContent(4)
                                }
                                <p><br></br></p>
                            </div>
                            <div className="col-12 semesterBox" style={{'margin-top':'20px'}}>
                                <h4>vår</h4>
                                <p>masteroppgave (30stp)</p>
                                <p><br></br></p>
                                <p><br></br></p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
            <div className="container-fluid summaryContent">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 summaryText">
                                <h4>Total of each topic</h4>
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

            <div className="container-fluid coursesContent">
                <div className="col-12 courseHeader">
                    <h3>Velg kategorier</h3>
                    <Select onChange={(selectedOptions) => topicsChanged(selectedOptions)} options={topicsOptions} className="selectedTopics" isMulti />
                    <br></br>
                    <h3>Søk i fag</h3>
                    <div className="freetextField css-yk16xz-control">
                        <input id="freeTextInputId" name="freeTextInput" className="freetextInput" placeholder="Free text..." onChange={() => inputChanged()}></input>
                    </div>
                </div>

                <div className="row" style={{'padding-top':'30px'}}>
                    <div className="col-lg-10 offset-lg-1">
                        <div className="row">
                        {Object.values(courses).filter(x => x.topics.some(y => currentTopics.indexOf(y) >= 0)).filter(val => val.name.toLowerCase().includes(currentSearchText.toLowerCase())).sort((a,b) => (a.name > b.name) ? 1 : -1).map(course => (
                            <div className="courseBox col-sm-3" onClick={() => addCourse(course)}>
                                <SubjectListing
                                data={course}
                                />
                                {currentCourses.some(x => x === course) && (
                                <div className="btnBox">
                                    <button className="btn-opt" onClick={() => removeSelCourse(course)} value="Fjern">Fjern</button>
                                </div>
                                )}
                                {currentCourses.some(x => x === course) !== true && (
                                    <div className="btnBox">
                                        <button className="btn-opt" onClick={() => addSelCourse(course, 0)} value="3">+3</button>
                                        <button className="btn-opt" onClick={() => addSelCourse(course, 1)} value="4">+4</button>
                                        <button className="btn-opt" onClick={() => addSelCourse(course, 2)} value="5">+5</button>
                                    </div>
                                )}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                    
            </div>
        </div>
  );
};
export default CoursePicker;