/*

<ButtonToolbar>
    {
        specializations.map(specialization => (
            <button className="btn-spec" onClick={() => addSpecialization(specialization)} value={specializationNames[specialization]}>{specializationNames[specialization]}</button>
            ))
        }
</ButtonToolbar>
<ButtonToolbar>
    {
        topics.map(topic => (
            <button className="btn-top" onClick={() => addTopic(topic)} value={topicNames[topic]}>{topicNames[topic]}</button>
        ))
    }
</ButtonToolbar>



<div className="col-12" style={{'margin-top': '20px'}}>
                    <p>Active courses</p>
                    <p>{currentCourses.map(x => x.name).join(", ")}</p>
                    </div>



                    <p>Active specialization: {specializationNames[currentSpecialization]}</p>
                    <p>Active topic(s): {currentTopics.map(x => topicNames[x]).join(", ")}</p>



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



            <div
                className={"NavElement " + (selectedPage === "/courseSummary" && "Selected")}
            >
                <Link to="/courseSummary">
                <img src="list.svg" color="#171717" alt="list" />
                </Link>
            </div>






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

            <div className="col-6">
                                <Plot
                                    data={[
                                    {type: 'bar', x: addTopicsToSummaryGraph().map(x => x[0]), y: addTopicsToSummaryGraph().map(x => x[1])},
                                    ]}
                                    layout={ {width: 320, height: 240, title: ''} }
                                />
                            </div>
                            <div className="col-6 plotDiv">
                                    {MyResponsiveBar([{
            "country": "AD",
            "": 115,
          },
          { 
            "country": "AE",
            "": 165,
          },])}
                            </div>




















                            <div className="row" style={{'padding-top':'30px'}}>
                    <div className="col-lg-12 offset-lg-0">
                        <div className="row">
                            <div className="col-12" style={{'textAlign':'center'}}>
                                <h3>Velg fag</h3>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-12 col-12 sticky">
                                <h4>Kategorier</h4>
                                <Select styles={colourStyles} onChange={(selectedOptions) => topicsChanged(selectedOptions)} options={topicsOptions} className="selectedTopics" isMulti placeholder="Velg..."/>
                                <h4>Søk</h4>
                                <div className="freetextField css-yk16xz-control">
                                    <input id="freeTextInputId" name="freeTextInput" className="freetextInput" placeholder="Fritekst..." onChange={() => inputChanged()}></input>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-8 offset-xl-1 offset-lg-0 offset-md-2">
                                <div className="row">
                                    {testingStuff()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>













                <div>
                    <span className="pointerr" onClick={() => (setOverviewActive(true), setRecommendationActive(false), setCoursesActive(false))}><h5 style={{'padding':'0px 0px 0px 0px', 'margin':'0px 0px 10px 10px', 'fontSize':'18px'}}>Oversikt</h5></span>
                    <span className="pointerr" onClick={() => (setOverviewActive(false), setRecommendationActive(true), setCoursesActive(false))}><h5 style={{'padding':'0px 0px 0px 0px', 'margin':'0px 0px 10px 10px', 'fontSize':'18px'}}>Oppsett</h5></span>
                    <span className="pointerr" onClick={() => (setOverviewActive(false), setRecommendationActive(false), setCoursesActive(true))}><h5 style={{'padding':'0px 0px 0px 0px', 'margin':'0px 0px 10px 10px', 'fontSize':'18px'}}>Fag</h5></span> 
                </div>





                
.courseOverviewAdd {
  display: inline-block;
  color: #ac93e5;
}

.courseOverviewAddContain:hover .stacking-menu-contain {
  visibility: visible;
  opacity: 1;
  transition: visibility 1s;
}

.stacking-menu-contain {
  visibility: hidden;
  opacity: 0;
  transition: visibility 1s;
}

















function addMenyContent(semester, year) {
        let contentt = [];
        let subcontentt = [];
        Object.keys(courses_alt3).forEach(key => {
            let subsubcontentt = []
            Object.values(courses_alt3[key]).forEach(val => {
                if (val.term == semester) {
                    subsubcontentt.push(
                    <li>
                    {val.name}
                        <ul>
                            <li onClick={() => addSelCourse(val, 0)}>{val.name + "0"}</li>
                            <li onClick={() => addSelCourse(val, 0)}>{val.name + "0"}</li>
                            <li onClick={() => addSelCourse(val, 1)}>{val.name + "0"}</li>
                            <li onClick={() => addSelCourse(val, 1)}>{val.name + "0"}</li>
                            <li onClick={() => addSelCourse(val, 2)}>{val.name + "0"}</li>
                            <li onClick={() => addSelCourse(val, 3)}>{val.name + "0"}</li>
                        </ul>
                    </li>
                    )
                }
            })
            subcontentt.push(
            <li>
                {key}
                <ul className="stacking-sub-menu">
                    {subsubcontentt}
                </ul>
            </li>)
        })
        contentt.push(
            <div className="stacking-menu-contain">
                <ul className="stacking-menu">
                    {subcontentt}
                </ul>
            </div>
        )
        return contentt;
    }


    function setEasyPicker(asd) {

    }
    
    .stacking-menu {
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  width: 40px;
  text-align: left;
}

.stacking-menu li {
  color: white;
  display: block;
  position: relative;
  text-decoration: none;
}

.stacking-menu li li {
  cursor: pointer;
}

.stacking-menu li:hover {
  background: #ac93e5;
}

.stacking-menu {
  background: #ccc;
}

.stacking-menu ul {
    position: absolute;
    top: 0px;
    left: 0px;
    display: none;
  }
  
  .stacking-menu li:hover ul ul {
    display: none;
  }
  
  .stacking-menu li:hover ul {
    display: block;
  }
  .stacking-menu li li:hover ul {
    margin-top: 0px;
    display: block;
  }
  nu-li {
    padding: 10px;
  }
  

  http://jsfiddle.net/n5u2wwjg/233886/

    */
