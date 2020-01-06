import React, { useEffect, useState } from "react";
import "./CoursePicker.css";

import { ButtonToolbar, Button} from "react-bootstrap";
import SubjectListing from "../../Components/Subject/SubjectListing";
import SubjectListingOpt2 from "../../Components/Subject/SubjectListingOpt2";

import CourseSummary from "../../Components/Subject/CourseSummary";
import Select from 'react-select';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import ReactTooltip from 'react-tooltip';

import {
    Chart
} from '../../shared/Plot/Plot2.js'

import { IoIosCloseCircle } from "react-icons/io";

import { 
    terms,
} from '../../shared/Constants/Constants.js'

import {
    mandatoryCourses,
} from '../../shared/Constants/MandatoryCourses.js'

import {
    courses,
    courseTagDesc,
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

import {
    recommendedCourses,
} from '../../shared/Constants/CourseRecommendations.js'

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key].substring(0, 3)] = rv[x[key].substring(0, 3)] || []).push(x);
      return rv;
    }, {});
  };

const CoursePicker = props => {
    const [currentSpecialization, setCurrentSpecialization] = useState(null)
    const [currentTopics, setCurrentTopics] = useState([]);
    const [currentCourses, setCurrentCourses] = useState([]);
    const [currentCourseNames, setCurrentCourseNames] = useState([])
    const [exchangeAutumn, setExchangeAutumn] = useState(false);
    const [exchangeSpring, setExchangeSpring] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState({});
    const [topicCount, setTopicCount] = useState({});
    const [currentSearchText, setCurrentSearchText] = useState("");
    const [recommendationTopic, setRecommendationTopic] = useState(null);

    function setCurrentCoursesAndNames(courses) {
        setCurrentCourses(courses);
        setCurrentCourseNames(courses.map(x => x.name.toUpperCase()));
    }

    if (currentTopics.length < 1) {
        setCurrentTopics(topics);
    }

    function setMandatoryCourses(selectedSpecialization ,previousSpecialization) {
        let mandCourses = mandatoryCourses(selectedSpecialization.value);
        let prevMandCourses = [];
        if (previousSpecialization !== null) {
            prevMandCourses = mandatoryCourses(previousSpecialization);
        }
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
        setCurrentCoursesAndNames(courses);
    }

    function removeCourse(course) {
        const index = currentCourses.indexOf(course);
        if (index > -1) {
            let courses = currentCourses.slice();
            courses.splice(index, 1);
            setCurrentCoursesAndNames(courses);
        }
    }

    function isSemesterFull(year, term) {
        let index = year*2 + term;
        if (index == 5) {
            return true;
        } else {
            const maxlen = index == 4 ? 2 : 4;
            if (selectedCourses[index] !== undefined) {
                return selectedCourses[index].length == maxlen
            } else {
                return false;
            }
        }
    }

    function addSelCourse(course, year) {
        let index = year*2 + course.term;
        const maxlen = index == 4 ? 2 : 4;

        if (index === 5) {
            return;
        }

        const nonSelectedCourses = course.prerequisites.filter(prereqCourse => !currentCourseNames.includes(prereqCourse.toUpperCase()));
        
        if (nonSelectedCourses.length > 0) {
            submit(course, index, maxlen, nonSelectedCourses);
        } else {
            addSelectedCourse(course, index, maxlen);
        }
    }

    function submit(course, index, maxlen, courses) {
        console.log(course);
        confirmAlert({
        title: 'Manglende forkunnskap',
        message: 'Du mangler følgende forkunnskap: ' + courses.map(x => x.toUpperCase()).join(', '),
        buttons: [
            {
            label: 'Legg til likevel',
            onClick: () => addSelectedCourse(course, index, maxlen)
            },
            {
            label: 'Gå tilbake',
            onClick: null
            }
        ]
        });
    };

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

    function addSelectedCourse(course, index, maxlen) {
        let selCourses = selectedCourses;

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
                content.push(
                    <div className="inlineDiv">
                        <a className="courseOverviewLink" href={"https://www.ntnu.no/studier/emner/" + course.name} rel="noopener noreferrer" target="_tab">
                            {course.name} {course.subname}
                        </a>
                        <span data-tip data-for="courseRemove" className="courseOverviewRemove" onClick={() => removeSelCourse(course)}><IoIosCloseCircle size={18} /></span>
                        <ReactTooltip place="right" id="courseRemove" aria-haspopup='true' role='example' effect="solid">
                            <p>Fjern</p>
                        </ReactTooltip>
                    </div>)
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
                                            content.push({'name': topicNames[key], count: value})
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

    function recommendationTopicChanged(topic) {
        setRecommendationTopic(topic.value);
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

    function exportPdf() {
        console.log("saving");
        html2canvas(document.querySelector("#capture")).then(canvas => {
            var d=canvas.toDataURL("image/png");
            var w=window.open('about:blank','image from canvas');
            w.document.write("<img src='"+d+"' alt='from canvas'/>");
        });
    }

    /*
    function exportPdf() {
        console.log("saving");
        html2canvas(document.querySelector("#capture"), {
            scrollX: 0,
            scrollY: 0
          }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps= pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            console.log("width:", pdfWidth)
            console.log("height:", pdfHeight)
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();
            console.log("width:", width)
            console.log("height:", height)
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save('download.pdf'); 
            console.log("saved?");
        });
    }
    */

    console.log("Current: ",currentCourses);
    console.log("CurrentNames: ", currentCourseNames);
    console.log("Selected: ",selectedCourses);

    function courseContent(course) {
        return (
            <div className="courseBox col-sm-3">
                <SubjectListing
                data={course}
                courses={currentCourseNames}
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
        )
    }

    function courseContent_opt2(course) {
        return (
            <div className="courseBox-opt2 col-12">
                <SubjectListingOpt2
                data={course}
                courses={currentCourseNames}
                />
                <div style={{'float':'right'}}>
                    <div className="courseTopics-opt2">
                        {course.topics.map(topic => (
                            <div className="topicsDiv-opt2">
                                <span data-tip data-for={course.name + "-" + topic} className="dot" style={{'backgroundColor':topicColors[topic]}}></span>
                                <ReactTooltip id={course.name + "-" + topic} aria-haspopup='true' role='example' effect="solid">
                                    <p>{topicNames[topic]}</p>
                                </ReactTooltip>
                            </div>
                        ))}
                    </div>
                    {currentCourses.some(x => x === course) && (
                        <div className="btnBox-opt2">
                            <button className="btn-opt-opt2 bigbtn" onClick={() => removeSelCourse(course)} value="Fjern">Fjern</button>
                        </div>
                    )}
                    {currentCourses.some(x => x === course) !== true && (
                        <div className="btnBox-opt2">
                            <button className={isSemesterFull(0, course.term) ? "btn-opt-opt2 fullCourseBtn" : "btn-opt-opt2"} onClick={() => addSelCourse(course, 0)} value="3">+3</button>
                            <button className={isSemesterFull(1, course.term) ? "btn-opt-opt2 fullCourseBtn" : "btn-opt-opt2"} onClick={() => addSelCourse(course, 1)} value="4">+4</button>
                            <button className={isSemesterFull(2, course.term) ? "btn-opt-opt2 fullCourseBtn" : "btn-opt-opt2"} onClick={() => addSelCourse(course, 2)} value="5">+5</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    function testingStuff() {
        let asd = groupBy(Object.values(courses)
                .filter(x => x.topics.some(y => currentTopics.indexOf(y) >= 0))
                .filter(val => val.name.toLowerCase().includes(currentSearchText.toLowerCase()) || val.subname.toLowerCase().includes(currentSearchText.toLowerCase()))
                .sort((a,b) => (a.name > b.name) ? 1 : -1)
            , "name");
        
        let contentt = [];
        Object.keys(asd).forEach(function(key) {
            let subcontentt = [];
            subcontentt.push(
                <div className="col-12">
                    <h4 style={{'textAlign':'center'}}>{key}</h4>
                    <h5 style={{'textAlign':'center'}}>{courseTagDesc[key.substring(0,3).toUpperCase()]}</h5>
                </div>
            )
            let value = asd[key];
            value.forEach(function(course) {
                subcontentt.push(
                    courseContent_opt2(course)
                )
            })
            contentt.push(subcontentt)
        })
        return contentt;
    }

    // currentCourses.map(x => x.topics).flat().reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()).forEach((key, value) => console.log(key, value))
    // <p>Exchange spring: {exchangeSpring}</p><button onClick={() => toggleSpring()}>{exchangeSpring ? "On" : "Off"}</button>
    return (
        <div>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Aldrich" />
            <div id="capture">
            <div className="container-fluid headerContent">
                <div className="row">
                    <div className="col-12 exportDiv">
                        <button onClick={() => exportPdf()} value="Save">Lagre oversikt</button>
                    </div>
                    <div className="col-12">
                        <h3>Velg spesialisering</h3>
                        <Select placeholder="Velg..." onChange={(selectedOptions) => specializationChanged(selectedOptions)} options={specializationOptions} className="selectSpecialization" />
                    </div>
                    <div className="col-12" style={{'marginTop':'20px'}}>
                        <h3>Velg semester med utveksling</h3>
                        <div className="headerDiv">
                            <p>Høst: </p>
                            <label className="switch" style={{'marginLeft':'5px', 'marginTop':'12px'}}>
                                <input type="checkbox" />
                                <span className="slider round" onClick={() => toggleAutumn()}/>
                            </label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <p>Vår:</p>
                            <label className="switch" style={{'marginLeft':'5px', 'marginTop':'12px'}}>
                                <input type="checkbox" />
                                <span className="slider round" onClick={() => toggleSpring()}/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="row" style={{'marginTop': '20px'}}>
                            <div className="col-lg-4">
                                <h3>3. klasse</h3>
                                <div className="row">
                                    <div className="col-12 semesterBox">
                                        <h4>høst</h4>
                                        {
                                            selectedCoursesContent(0)
                                        }
                                    </div>
                                    <div className="col-12 semesterBox" style={{'marginTop':'20px'}}>
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
                                    <div className="col-12 semesterBox" style={{'marginTop':'20px'}}>
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
                                    <div className="col-12 semesterBox" style={{'marginTop':'20px'}}>
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
                            <div className="col-12" style={{'textAlign':'center'}}>
                                <h3>Oppsummering</h3>
                                <br></br>
                            </div>
                            {currentCourses.length == 0 && (
                                <div className="col-12" style={{'textAlign':'center'}}>
                                <p>Ingen fag valgt</p>
                                </div>
                            )}
                            {currentCourses.length > 0 && (
                                <div className="col-3 summaryText">
                                {
                                    addTopicsToSummary()
                                }
                                </div>
                            )}
                            {currentCourses.length > 0 && (
                                <div className="col-6" style={{'font-color':'black'}}>
                                {Chart(addTopicsToSummaryGraph())}
                            </div>
                            )
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="container-fluid recommendationContent">
                <div className="row">
                    <div className="col-12">
                        <h3>Anbefalte fag</h3>
                        <h4 style={{'marginBottom':'20px'}}>NB: veldig subjektivt/eksperimentelt</h4>
                        <Select placeholder="Velg..." onChange={(selectedOptions) => recommendationTopicChanged(selectedOptions)} options={topicsOptions} className="selectSpecialization" />
                        {recommendationTopic !== null && (
                            <CourseSummary 
                            data = {recommendedCourses(recommendationTopic)}
                            courses = {courses}
                        />
                        )
                        }
                    </div>
                </div>
            </div>
            <div className="container-fluid coursesContent">
                {false && (
                    <div className="col-12 courseHeader">
                        <h3>Velg kategorier</h3>
                        <Select styles={colourStyles} onChange={(selectedOptions) => topicsChanged(selectedOptions)} options={topicsOptions} className="selectedTopics" isMulti placeholder="Velg..."/>
                        <br></br>
                        <h3>Søk i fag</h3>
                        <div className="freetextField css-yk16xz-control">
                            <input id="freeTextInputId" name="freeTextInput" className="freetextInput" placeholder="Fritekst..." onChange={() => inputChanged()}></input>
                        </div>
                    </div>
                )}

                <div className="row" style={{'paddingTop':'30px'}}>
                    <div className="col-lg-12 offset-lg-0">
                        <div className="row flex-lg-row-reverse">
                            <div className="col-12" style={{'textAlign':'center'}}>
                                <h3>Velg fag</h3>
                            </div>
                            <div className="col-xl-2 col-lg-3 offset-xl-right-1 col-md-12 sticky center-on-mobile" style={{'paddingTop':'58px'}}>
                                <h4>Filtrer på kategorier</h4>
                                <Select styles={colourStyles} onChange={(selectedOptions) => topicsChanged(selectedOptions)} options={topicsOptions} className="selectedTopics" isMulti placeholder="Velg..."/>
                                <h4>Søk</h4>
                                <div className="freetextField css-yk16xz-control">
                                    <input id="freeTextInputId" name="freeTextInput" className="freetextInput" placeholder="Fritekst..." onChange={() => inputChanged()}></input>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-8 offset-md-2 col-sm-12">
                                <div className="row">
                                    {testingStuff()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {false && (<div className="row" style={{'padding-top':'30px'}}>
                    <div className="col-lg-10 offset-lg-1">
                        <div className="row">
                        {Object.values(courses)
                            .filter(x => x.topics.some(y => currentTopics.indexOf(y) >= 0))
                            .filter(val => val.name.toLowerCase().includes(currentSearchText.toLowerCase()) || val.subname.toLowerCase().includes(currentSearchText.toLowerCase()))
                            .sort((a,b) => (a.name > b.name) ? 1 : -1)
                            .map(course => (
                                courseContent(course)
                        ))}
                        </div>
                    </div>
                </div>
                )}   
            </div>
        </div>
  );
};
export default CoursePicker;