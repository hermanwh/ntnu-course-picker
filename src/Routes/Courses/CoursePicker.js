import React, { useEffect, useState, useCallback } from "react";
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
import { useAlert } from 'react-alert';

import {
    Chart
} from '../../shared/Plot/Plot2.js'

import { IoIosCloseCircle, IoIosAddCircle } from "react-icons/io";

import { 
    terms,
} from '../../shared/Constants/Constants.js'

import {
    mandatoryCourses,
} from '../../shared/Constants/MandatoryCourses.js'

import {
    courses,
    sortedCourseList,
    courseTagDesc,
    courseTagObj,
    courses_alt3,
    sortByName,
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

import { firebaseConfig } from "../../shared/Firebase/index.js";

import Join from "../../Components/Auth/Join";
import Login from "../../Components/Auth/Login";

import firebase from "firebase/app";
import "firebase/storage";

import {
    groupBy
} from "../../shared/Help/index.js";

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export const AuthContext = React.createContext(null);

const CoursePicker = props => {
    const [currentSpecialization, setCurrentSpecialization] = useState(null)
    const [currentTopics, setCurrentTopics] = useState([]);
    const [exchangeAutumn, setExchangeAutumn] = useState(false);
    const [exchangeSpring, setExchangeSpring] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState({});
    const [currentCourses, setCurrentCourses] = useState([]);
    const [currentCourseNames, setCurrentCourseNames] = useState([]);
    const [topicCount, setTopicCount] = useState({});
    const [currentSearchText, setCurrentSearchText] = useState("");
    const [recommendationTopic, setRecommendationTopic] = useState(null);
    const [selectedCoursesArray, setSelectedCoursesArray] = useState([]);
    const [currentPlanName, setCurrentPlanName] = useState("Ny plan");
    const [currentActivePlanIndex, setCurrentActivePlanIndex] = useState(0);
    const [loggingIn, setLoggingIn] = useState(false);
    const [joining, setJoining] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);

    const [overviewActive, setOverviewActive] = useState(true);
    const [recommendationActive, setRecommendationActive] = useState(false);
    const [coursesActive, setCoursesActive] = useState(false);

    const [activeCoursesList, setActiveCoursesList] = useState(courseTagObj);

    const [courseListActive, setCourseListActive] = useState(true);

    const alert = useAlert();

    function updateActiveCoursesList(tag) {
        let activeCopy = {...activeCoursesList};
        activeCopy[tag] = !activeCopy[tag];
        setActiveCoursesList(activeCopy);
    }

    function flat(input, depth = 1, stack = []) {
        for (let item of input)
        {
            if (item instanceof Array && depth > 0)
            {
                flat(item, depth - 1, stack);
            }
            else {
                stack.push(item);
            }
        }

        return stack;
    }

    function setSelectedCoursesWithSideEffects(selCourses) {
        setSelectedCourses(selCourses);
        setCurrentCourses(getCurrentCourses(selCourses));
        setCurrentCourseNames(getCurrentCourseNames(selCourses));
    }

    function getCurrentCourseNames(selCourses) {
        return getCurrentCourses(selCourses).map(crs => crs.name.toUpperCase());
    }

    function getCurrentCourses(selCourses) {
        let asddd = [];
        Object.keys(selCourses).forEach(function(key) {
            Object.keys(selCourses[key]).forEach(function(subkey) {
                asddd.push(selCourses[key][subkey])
            })
        })
        return asddd;
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
        })
        mandCourses.forEach(function(crs) {
            addSelCourse(courses[crs.name], crs.year);
        })
    }

    function isSemesterFull(year, term) {
        let index = year*2 + term;
        if (index == 5) {
            return true;
        } else if (index === 2 && exchangeAutumn === true) {
            return true;
        } else if (index === 3 && exchangeSpring === true) {
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
            alert.error("Ingen fag valgte semester");
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
        removeSelectedCourse(course);
    }

    function removeSelectedCourse(course) {
        console.log("Remove selected course", course);
        console.log(selectedCourses);
        let selCourses = selectedCourses;
        Object.keys(selCourses).forEach(function(key) {
            const indexx = selCourses[key].findIndex(crs => crs.name + crs.term === course.name + course.term);
            if (indexx > -1) {
                selCourses[key].splice( indexx, 1 );
            }
        })
        setSelectedCoursesWithSideEffects(selCourses);
        console.log(selCourses);
        console.log(selectedCourses);
    }

    function addSelectedCourse(course, index, maxlen) {
        let selCourses = selectedCourses;

        if (selCourses[index] === undefined) {
            selCourses[index] = [];
        }

        if (selCourses[index].length < maxlen && !Object.values(selCourses).includes(course)) {
            selCourses[index].push(course)
            alert.success(course.name + " lagt til i fagplan " + currentPlanName);
            setSelectedCoursesWithSideEffects(selCourses);
        } else {
            alert.error("Ikke plass til fag i valgte semester");
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
        flat(currentCourses.map(x => x.topics))
                                        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
                                        .forEach((value, key) => (
                                            content.push(<p>{topicNames[key]}: {value}</p>)
                                        ));
        return content;
    }

    function addTopicsToSummaryGraph() {
        let content = [];
        flat(currentCourses.map(x => x.topics))
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
        scrollToTop();
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

    function courseContent(course) {
        return (
            <div className="courseBox col-sm-3">
                <SubjectListing
                data={course}
                courses={currentCourseNames}
                />
                {currentCourses.some(x => (x.name + x.term) === (course.name + course.term)) && (
                <div className="btnBox">
                    <button className="btn-opt" onClick={() => removeSelCourse(course)} value="Fjern">Fjern</button>
                </div>
                )}
                {currentCourses.some(x => (x.name + x.term) === (course.name + course.term)) !== true && (
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
                    {currentCourses.some(x => (x.name + x.term) === (course.name + course.term)) && (
                        <div className="btnBox-opt2">
                            <button className="bigbtn" onClick={() => removeSelCourse(course)} value="Fjern">Fjern</button>
                        </div>
                    )}
                    {currentCourses.some(x => (x.name + x.term) === (course.name + course.term)) !== true && (
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

    function courseContentSortedByInstitute() {
        /*let sortedCourses = groupBy(
                sortedCourseList
                .filter(x => x.topics.some(y => currentTopics.indexOf(y) >= 0))
                .filter(val => val.name.toLowerCase().includes(currentSearchText.toLowerCase()) || val.subname.toLowerCase().includes(currentSearchText.toLowerCase()))
            , "name"
            );
        console.log("sortedCourses", sortedCourses);
        console.log("alt 2", courses_alt3);
        */
        let sortedCourses = courses_alt3;
        let contentt = [];
        Object.keys(sortedCourses).forEach(function(key) {
            let value = sortedCourses[key].filter(x => x.topics.some(y => currentTopics.indexOf(y) >= 0) || (x.topics.length == 0 && currentTopics.length == 11))
                                          .filter(val => val.name.toLowerCase().includes(currentSearchText.toLowerCase()) || val.subname.toLowerCase().includes(currentSearchText.toLowerCase()));
            if (value.length > 0) {

                let subcontentt = [];
                subcontentt.push(
                    <div className="col-12">
                    <h5 style={{'textAlign':'center'}}>{courseTagDesc[key.substring(0,3).toUpperCase()]}</h5>
                </div>
                )
                sortByName(value).forEach(function(course) {
                    subcontentt.push(
                        courseContent_opt2(course)
                    )
                })
                contentt.push(
                    <div style={{'paddingTop':'15px'}}>
                        <div className={activeCoursesList[key.substring(0,3).toUpperCase()] ? "row" : "row shortRow"}>
                            {subcontentt}
                        </div>
                        {value.length > 5 && (
                            <div style={{'textAlign':'center'}}>
                                <span className="pointerr" onClick={() => updateActiveCoursesList(key.substring(0,3).toUpperCase())}><h6 style={{'display':'inline-block'}}>{activeCoursesList[key.substring(0,3).toUpperCase()] ? 'Vis mindre' : 'Vis mer'}</h6></span>
                            </div>  
                        )}
                    </div>
                )
            }
        })
        //return contentt;
        return contentt;
    }


    function firebaseContent() {
        return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, storage, selectedCoursesArray, setSelectedCoursesArray, downloadButtonPressed, setJoining, setLoggingIn }}>
            <div>
                <div>
                    {joining && (
                        <Join />
                    )}
                    {loggingIn && (
                        <Login />
                    )}
                </div>
            </div>
        </AuthContext.Provider>
        )
    }

    function dbButtonMeny() {
        return (
            <div>
                <div onClick={() => uploadButtonPressed()} className="button button-3">
                    <div className="circle"></div>
                    <a>Lagre</a>
                </div>
            </div>
        )
    }

    function uploadButtonPressed() {
        let selectedCopy = selectedCoursesArray.slice();
        selectedCopy.splice(currentActivePlanIndex, 1, [selectedCourses, currentCourses, currentPlanName]);
        let coursesCopy = selectedCopy.slice();
        if (coursesCopy[0][1].length == 0) {
            coursesCopy.splice(0, 1);
        }

        if (coursesCopy.map(x => x[2]).findIndex(y => y === "Ny plan") > -1) {
            alert.error("Vennligst gi planen din et annet navn enn 'Ny plan'");
        } else {
            uploadToDb(coursesCopy, `${firebase.auth().currentUser.uid}/selectedCourses.json`, storage);
        }

    }

    async function downloadButtonPressed() {
        downloadFromDb(`${firebase.auth().currentUser.uid}/selectedCourses.json`, storage, setSelectedCoursesArray);
    }

    function downloadFromDb(ref, storage, setMethod) {
        const downloadRefConfig = storage.ref(ref);
        downloadRefConfig.getDownloadURL().then(url => {
            fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                jsonData.splice(0, 0, [{}, [], "Ny plan"]);
                setMethod(jsonData);
            })
            .catch(error => {
                console.log("error");
            });
        })
        .catch(error => {
            console.log("error while loading from db");
            setMethod([[{}, [], "Ny plan"]]);
        });
    }

    function uploadToDb(jsonContent, ref, storage) {
        const configblob = new Blob([JSON.stringify(jsonContent)], {
          type: "application/json"
        });
    
        const uploadTaskConfig = storage
            .ref(ref)
            .put(configblob);
    
        // observer for when the state changes, e.g. progress
        uploadTaskConfig.on(
            "state_changed",
            snapshot => {
            // Do nothing as of yet
            },
            error => {
                console.log(error);
            }
        );

        alert.success("Data lagret");
    }

    function planNameChanged() {
        let asd = document.getElementById("planNameInputId").value;
        setCurrentPlanName(asd);
    }

    function changePlan(index) {
        let selectedCopy = selectedCoursesArray.slice();
        selectedCopy.splice(currentActivePlanIndex, 1, [selectedCourses, currentCourses, currentPlanName]);
        setSelectedCoursesArray(selectedCopy);
        setSelectedCoursesWithSideEffects(selectedCopy[index][0]);
        setCurrentPlanName(selectedCopy[index][2]);
        setCurrentActivePlanIndex(index);
    }

    function addNewPlan() {
        let selectedCopy = selectedCoursesArray.slice();
        selectedCopy.splice(currentActivePlanIndex, 1, [selectedCourses, currentCourses, currentPlanName]);
        selectedCopy.splice(0, 0, [{}, [], "Ny plan"]);
        setSelectedCoursesArray(selectedCopy);
        setSelectedCoursesWithSideEffects(selectedCopy[0][0]);
        setCurrentPlanName(selectedCopy[0][2]);
        setCurrentActivePlanIndex(0);
    }

    function planContent() {
        let contentt = [];
        let header = [];
        
        selectedCoursesArray.map(function(val, i) {
            if (i === currentActivePlanIndex) {
                header.push(<p style={{'display':'block'}}>{val[2]}</p>)
            } else {
                contentt.push(
                    <div className="button-3">
                        <div className="circle"></div>
                        <button onClick={() => changePlan(i)}>{val[2]}</button>
                    </div>
                    )
                }
            }
        )

        return(
            <div className="col-md-8 offset-md-2">
                <h6>Aktiv plan:</h6>
                {header}
                {contentt.length > 0 && (
                    <h6 style={{'paddingTop':'8px'}}>Bytt til:</h6>
                )}
                <div className="flex-container" style={{'paddingTop':'5px'}}>
                    {contentt}
                </div>
                <div className="button-3" style={{'marginTop':'10px'}}>
                        <div className="circle"></div>
                        <button onClick={() => addNewPlan()}>Legg til tom plan</button>
                </div>
            </div>
        )
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    function mandatoryCoursesContent() {
        let contentt = []
        if (currentSpecialization !== null) {
            mandatoryCourses(currentSpecialization).forEach(mandCourse => {
                let course = courses[mandCourse.name]
                if (!currentCourseNames.some(name => name == course.name)) {
                    contentt.push(
                        <div className="inlineDiv">
                            <a className="courseOverviewLink" href={"https://www.ntnu.no/studier/emner/" + course.name} rel="noopener noreferrer" target="_tab">
                                {course.name} {course.subname} ({course.term == 0 ? 'høst' : 'vår'} {mandCourse.year == 0 ? '3.' : mandCourse.year == 1 ? '4.' : '5.'})
                            </a>
                            <span data-tip data-for="courseAdd" className="courseOverviewRemove" onClick={() => addSelCourse(course, mandCourse.year)}><IoIosAddCircle size={18} /></span>
                            <ReactTooltip place="right" id="courseAdd" aria-haspopup='true' role='example' effect="solid">
                                <p>Legg til</p>
                            </ReactTooltip>
                        </div>
                    );
                }
            });
            if (contentt.length > 0) {
                contentt.unshift(
                    <h6 style={{'marginTop':'20px'}}>
                        Obligatoriske fag som mangler:
                    </h6>
                )
            }
        }
        return contentt;
    }

    /*
    
    const [currentPlanName, setCurrentPlanName] = useState([]);
    const [currentActivePlanIndex, setCurrentActivePlanIndex] = useState(null);
    */

    console.log("currentCourses: ", currentCourses);
    console.log("currentCourseNames: ", currentCourseNames);
    console.log("selectedCourses: ", selectedCourses);
    console.log("selectedCoursesArray:", selectedCoursesArray);
    console.log("ActiveCoursesList", activeCoursesList);

    // currentCourses.map(x => x.topics).flat().reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()).forEach((key, value) => console.log(key, value))
    // <p>Exchange spring: {exchangeSpring}</p><button onClick={() => toggleSpring()}>{exchangeSpring ? "On" : "Off"}</button>
    return (
        <div>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Aldrich" />
            <div className="subMenu">
                {!isLoggedIn && (
                    <div>
                        <span className="pointerr" onClick={() => (setJoining(!joining), setLoggingIn(false), scrollToTop())}><h5 style={{'padding':'0px 0px 0px 0px', 'margin':'0px 0px 10px 10px', 'fontSize':'18px'}}>Registrer</h5></span>
                        <span className="pointerr" onClick={() => (setLoggingIn(!loggingIn), setJoining(false), scrollToTop())}><h5 style={{'padding':'0px 0px 0px 0px', 'margin':'0px 0px 10px 10px', 'fontSize':'18px'}}>Logg inn</h5></span>
                    </div>
                )}
            </div>
            <div className="container-fluid headerContent">
                {isLoggedIn && (
                    <div style={{'color':'white'}}>
                        Hei, {firebase.auth().currentUser.email.split('@')[0]}!
                    </div>
                )}
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        {firebaseContent()}
                    </div>
                </div>
                {isLoggedIn && overviewActive && (
                    <div className="row" style={{'marginTop':'0px', 'marginBottom':'20px'}}>
                        <div className="col-12" style={{'paddingTop':'10px'}}>
                            {planContent()}
                        </div>
                    </div>
                )}
                <div className="row" style={{'paddingTop':'40px'}}>
                    <div className="col-12">
                        <h3>Velg spesialisering</h3>
                        <Select placeholder="Velg..." onChange={(selectedOptions) => specializationChanged(selectedOptions)} options={specializationOptions} className="selectSpecialization" />
                        {mandatoryCoursesContent()}
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
                    <div className="col-12" style={{'paddingTop':'10px'}}>
                        <div className="button button-3">
                            <div className="circle"></div>
                            <button onClick={() => exportPdf()}>Eksporter oversikt</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="capture">
            <div className="container-fluid coursesOverviewContent">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="row" style={{'marginTop': '20px'}}>
                            <div className="col-lg-4">
                                <h3>3. klasse</h3>
                                <div className="row">
                                    <div className="col-12 semesterBox">
                                        <h4>Høst</h4>
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
                                <div className="col-6" style={{'fontColor':'black'}}>
                                {Chart(addTopicsToSummaryGraph())}
                            </div>
                            )
                            }
                            
                        </div>
                    </div>
                </div>
                {isLoggedIn && (
                    <div className="row" style={{'marginTop':'40px'}}>
                        <div className="col-12">
                            <h6>Navngi plan:</h6>
                            <div className="css-yk16xz-control" style={{'width':'200px', 'margin':'0 auto', 'marginTop':'10px', 'marginBottom':'10px'}}>
                                <input id="planNameInputId" className="planNameInput" value={currentPlanName === "Ny plan" ? "" : currentPlanName} placeholder="Skriv inn..." onChange={() => planNameChanged()}></input>
                            </div>
                        </div>
                        <div className="col-12" style={{'paddingTop':'10px'}}>
                            {dbButtonMeny()}
                        </div>
                    </div>
                )}
            </div>
            </div>
            <div className="container-fluid buttonsContent">
                <div className="row">
                    <div className="col-12">
                        <div className="button-3 buttonMenuLeft">
                            <div className={courseListActive ? "circle activeButton" : "circle"}></div>
                            <button onClick={() => setCourseListActive(true)}>Fagliste</button>
                        </div>
                        <div className="button-3 buttonMenuRight">
                            <div className={!courseListActive ? "circle activeButton" : "circle"}></div>
                            <button onClick={() => setCourseListActive(false)}>Planforslag</button>
                        </div>
                    </div>
                </div>
            </div>
            {!courseListActive && (
            <div className="container-fluid recommendationContent">
                <div className="row">
                    <div className="col-12">
                        <h3>Velg kategori</h3>
                        <Select placeholder="Velg..." onChange={(selectedOptions) => recommendationTopicChanged(selectedOptions)} options={topicsOptions} className="selectSpecialization" />
                        {recommendationTopic !== null && (
                            <CourseSummary 
                            data = {recommendedCourses(recommendationTopic)}
                            courses = {courses}
                        />
                        )
                        }
                        <h4 style={{'marginBottom':'20px'}}>NB: veldig subjektivt/eksperimentelt</h4>
                    </div>
                </div>
            </div>
            )}
            {courseListActive && (
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

                <div className="row">
                    <div className="col-lg-12 offset-lg-0">
                        <div className="row flex-lg-row-reverse">
                            <div className="col-xl-2 col-lg-3 offset-xl-right-1 col-md-12 sticky center-on-mobile" style={{'paddingTop':'58px'}}>
                                <h4>Filtrer på kategorier</h4>
                                <Select styles={colourStyles} onChange={(selectedOptions) => topicsChanged(selectedOptions)} options={topicsOptions} className="selectedTopics" isMulti placeholder="Velg..."/>
                                <h4>Søk</h4>
                                <div className="freetextField css-yk16xz-control">
                                    <input id="freeTextInputId" name="freeTextInput" className="freetextInput" placeholder="Fritekst..." onChange={() => inputChanged()}></input>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-8 offset-md-2 col-sm-12">
                                {courseContentSortedByInstitute()}
                            </div>
                        </div>
                    </div>
                </div>

                {false && (
                <div className="row" style={{'padding-top':'30px'}}>
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
            )}
        </div>
  );
};
export default CoursePicker;