import React, { useEffect, useState } from "react";
import "./CoursePicker.css";
import Plot from 'react-plotly.js';

import { ButtonToolbar, Button} from "react-bootstrap";
import SubjectListing from "../../Components/Subject/SubjectListing";
import Select from 'react-select';

import { 
    terms,
} from '../../shared/Constants/Constants.js'

import {
    mandatoryCourses,
} from '../../shared/Constants/MandatoryCourses.js'

import {
    courses,
} from '../../shared/Constants/Courses.js'

import {
    topicNames,
    topics,
    topicsOptions,
    topicColors,
    colourStyles,
} from '../../shared/Constants/Topics.js'

import {
    specializationNames,
    specializations,
    specializationOptions,
} from '../../shared/Constants/Specializations.js'

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

    function setMandatoryCourses(selectedSpecialization ,previousSpecialization) {
        let mandCourses = mandatoryCourses(selectedSpecialization.value);
        let prevMandCourses = [];
        if (previousSpecialization !== null) {
            prevMandCourses = mandatoryCourses(previousSpecialization);
        }
        console.log("Mand: ", mandCourses);
        console.log("Prev mand: ", prevMandCourses);
        prevMandCourses.forEach(function(crs) {
            removeSelCourse(courses[crs.name]);
            currentCourses.splice(currentCourses.indexOf(courses[crs.name]), 1);
        })
        mandCourses.forEach(function(crs) {
            addSelCourse(courses[crs.name], crs.year);
            currentCourses.push(courses[crs.name]);
        })
    }

    function addCourse(course) {
        const index = currentCourses.indexOf(course);
        let courses = currentCourses.slice();
        courses.push(course);
        setCurrentCourses(courses);
    }

    function removeCourse(course) {
        const index = currentCourses.indexOf(course);
        if (index > -1) {
            let courses = currentCourses.slice();
            courses.splice(index, 1);
            setCurrentCourses(courses);
        }
    }

    function addSelCourse(course, year) {
        addSelectedCourse(course, year);
    }

    function removeSelCourse(course) {
        removeCourse(course);
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
        const maxlen = index == 4 ? 2 : 4;

        if (selCourses[index] === undefined) {
            selCourses[index] = [];
        }

        if (selCourses[index].length < maxlen && !Object.values(selCourses).includes(course)) {
            selCourses[index].push(course)
            setSelectedCourses(selCourses);
            addCourse(course);
        } else {
            console.log("too long");
            console.log(currentCourses);
            console.log(selectedCourses);
        }
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
        } else {
            setCurrentTopics(topics);
        }
    }

    function specializationChanged(selectedSpecialization) {
        let previousSpecialization = currentSpecialization;
        if (selectedSpecialization.value !== previousSpecialization) {
            setCurrentSpecialization(selectedSpecialization.value);
            setMandatoryCourses(selectedSpecialization, previousSpecialization);
        }
    }

    function inputChanged() {
        let asd = document.getElementById("freeTextInputId").value;
        setCurrentSearchText(asd);
    }


    const customSelectStyles = {
        menu: (provided, state) => ({
            ...provided,
            color: state.selectProps.menuColor,
            }),
        
            singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
        
            return { ...provided, opacity, transition };
            }
    }
    
    console.log("Current: ",currentCourses);
    console.log("Selected: ",selectedCourses);

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
                                <p>Prosjektoppgave (15stp)</p>
                                {
                                    selectedCoursesContent(4)
                                }
                                <p><br></br></p>
                            </div>
                            <div className="col-12 semesterBox" style={{'margin-top':'20px'}}>
                                <h4>vår</h4>
                                <p>Masteroppgave (30stp)</p>
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
                                <h4>Sum av fag for hver kategori</h4>
                                {
                                    addTopicsToSummary()
                                }
                            </div>
                            <div className="col-6">
                                <Plot
                                    data={[
                                    {type: 'bar', x: addTopicsToSummaryGraph().map(x => x[0]), y: addTopicsToSummaryGraph().map(x => x[1])},
                                    ]}
                                    layout={ {width: 320, height: 240, title: ''} }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid coursesContent">
                <div className="col-12 courseHeader">
                    <h3>Velg kategorier</h3>
                    <Select styles={colourStyles} onChange={(selectedOptions) => topicsChanged(selectedOptions)} options={topicsOptions} className="selectedTopics" isMulti />
                    <br></br>
                    <h3>Søk i fag</h3>
                    <div className="freetextField css-yk16xz-control">
                        <input id="freeTextInputId" name="freeTextInput" className="freetextInput" placeholder="Free text..." onChange={() => inputChanged()}></input>
                    </div>
                </div>

                <div className="row" style={{'padding-top':'30px'}}>
                    <div className="col-lg-10 offset-lg-1">
                        <div className="row">
                        {Object.values(courses)
                            .filter(x => x.topics.some(y => currentTopics.indexOf(y) >= 0))
                            .filter(val => val.name.toLowerCase().includes(currentSearchText.toLowerCase()) || val.subname.toLowerCase().includes(currentSearchText.toLowerCase()))
                            .sort((a,b) => (a.name > b.name) ? 1 : -1)
                            .map(course => (
                            <div className="courseBox col-sm-3">
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