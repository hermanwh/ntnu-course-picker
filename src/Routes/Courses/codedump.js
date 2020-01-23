/*


EXPORT PDF

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



















/*

export const courses_old = {
    tpg4105: {
        name: "TPG4105",
        subname: "Petroleumsteknologi, grunnkurs",
        term: 0,
        topics: [3],
        prerequisites: [],
    },
    tmr4215: {
        name: "TMR4215",
        subname: "Sjøbelastninger",
        term: 0,
        topics: [5, 6],
        prerequisites: [],
    },
    tmr4167: {
        name: "TMR4167",
        subname: "Marin teknikk, konstruksjoner",
        term: 0,
        topics: [5, 6],
        prerequisites: [],
    },
    tkt4180: {
        name: "TKT4180",
        subname: "Konstruksjonsmekanikk, beregningsmetoder",
        term: 1,
        topics: [2, 5, 6],
        prerequisites: [],
    },
    tkt4124: {
        name: "TKT4124",
        subname: "Mekanikk 3",
        term: 0,
        topics: [2, 5, 6],
        prerequisites: [],
    },
    tba4236: {
        name: "TBA4236",
        subname: "Teoretisk geomatikk",
        term: 0,
        topics: [0, 6],
        prerequisites: [],
    },
    tba4250: {
        name: "TBA4250",
        subname: "Geografisk informasjonsbehandling 2",
        term: 1,
        topics: [0, 6],
        prerequisites: [],
    },
    tba4240: {
        name: "TBA4240",
        subname: "Geografisk informasjonsbehandling 1",
        term: 0,
        topics: [0, 6],
        prerequisites: [],
    },
    tba4231: {
        name: "TBA4231",
        subname: "Anvendt geomatikk",
        term: 0,
        topics: [0, 6],
        prerequisites: [],
    },
    tma4130: {
        name: "TMA4130",
        subname: "Matematikk 4N",
        term: 0,
        topics: [10],
        prerequisites: [],
    },
    tiø4252: {
        name: "TIØ4252",
        subname: "Teknologiledelse",
        term: 0,
        topics: [7],
        prerequisites: [],
    },
    tiø4252v: {
        name: "TIØ4252",
        subname: "Teknologiledelse",
        term: 1,
        topics: [7],
        prerequisites: [],
    },
    tmr4160: {
        name: "TMR4160",
        subname: "Datametoder for ingeniørtekniske anvendelser",
        term: 1,
        topics: [2, 3, 5, 6],
        prerequisites: [],
    },
    tdt4136: {
        name: "TDT4136",
        subname: "Introduksjon til kunstig intelligens",
        term: 0,
        topics: [0, 4],
        prerequisites: [],
    },
    tdt4137: {
        name: "TDT4137",
        subname: "Kognitive arkitekturer",
        term: 0,
        topics: [0, 4],
        prerequisites: [],
    },
    tdt4160: {
        name: "TDT4160",
        subname: "Datamaskiner og digitalteknikk",
        term: 0,
        topics: [0],
        prerequisites: [],
    },
    tdt4165: {
        name: "TDT4165",
        subname: "Programmeringsspråk",
        term: 0,
        topics: [0],
        prerequisites: [],
    },
    tdt4173: {
        name: "TDT4173",
        subname: "Maskinlæring",
        term: 0,
        topics: [0, 4],
        prerequisites: [],
    },
    tdt4175: {
        name: "TDT4175",
        subname: "Informasjonssystemer",
        term: 0,
        topics: [0],
        prerequisites: [],
    },
    tdt4195: {
        name: "TDT4195",
        subname: "Grunnleggende visuell databehandling",
        term: 0,
        topics: [0, 3, 6],
        prerequisites: [],
    },
    tdt4200: {
        name: "TDT4200",
        subname: "Parallelle beregninger",
        term: 0,
        topics: [0],
        prerequisites: [],
    },
    tdt4225: {
        name: "TDT4225",
        subname: "Store distribuerte datamengder",
        term: 0,
        topics: [0],
        prerequisites: [],
    },
    tdt4250: {
        name: "TDT4250",
        subname: "Avansert programvaredesign",
        term: 0,
        topics: [0],
        prerequisites: [],
    },
    tdt4125: {
        name: "TDT4125",
        subname: "Algoritmekonstruksjon",
        term: 1,
        topics: [0],
        prerequisites: [],
    },
    tdt4150: {
        name: "TDT4150",
        subname: "Avanserte databasesystemer",
        term: 1,
        topics: [0],
        prerequisites: [],
    },
    tdt4171: {
        name: "TDT4171",
        subname: "Metoder i kunstig intelligens",
        term: 1,
        topics: [0, 4],
        prerequisites: [],
    },
    tdt4180: {
        name: "TDT4180",
        subname: "Menneske maskin-interaksjon",
        term: 1,
        topics: [0],
        prerequisites: [],
    },
    tdt4186: {
        name: "TDT4186",
        subname: "Operativsystemer",
        term: 1,
        topics: [0],
        prerequisites: [],
    },
    tdt4215: {
        name: "TDT4215",
        subname: "Anbefalingssystemer",
        term: 1,
        topics: [0],
        prerequisites: [],
    },
    tdt4237: {
        name: "TDT4237",
        subname: "Programvaresikkerhet",
        term: 1,
        topics: [0],
        prerequisites: [],
    },
    tdt4240: {
        name: "TDT4240",
        subname: "Programvarearkitektur",
        term: 1,
        topics: [0],
        prerequisites: [],
    },
    tdt4242: {
        name: "TDT4242",
        subname: "Avansert programvareutvikling",
        term: 1,
        topics: [0],
        prerequisites: [],
    },
    tdt4265: {
        name: "TDT4265",
        subname: "Datasyn og dyp læring",
        term: 1,
        topics: [0, 4],
        prerequisites: [],
    },
    tdt4300: {
        name: "TDT4300",
        subname: "Datavarehus og datagruvedrift",
        term: 1,
        topics: [0],
        prerequisites: [],
    },
    tdt4305: {
        name: "TDT4305",
        subname: "Big Data-arkitektur",
        term: 1,
        topics: [0],
        prerequisites: [],
    },
    ttk4115: {
        name: "TTK4115",
        subname: "Lineær systemteori",
        term: 0,
        topics: [1, 2, 5],
        prerequisites: ["ttk4105", "tma4130"],
    },
    ttk4147: {
        name: "TTK4147",
        subname: "Sanntidssystemer",
        term: 0,
        topics: [1],
        prerequisites: ["ttk4145"],
    },  
    ttk4150: {
        name: "TTK4150",
        subname: "Ulineære systemer",
        term: 0,
        topics: [1, 2, 5],
        prerequisites: ["ttk4105", "ttk4115"],
    },
    ttk4155: {
        name: "TTK4155",
        subname: "Industrielle og innebygde datasystemers konstruksjon",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    ttk4190: {
        name: "TTK4190",
        subname: "Fartøystyring",
        term: 0,
        topics: [1, 6],
        prerequisites: ["ttk4105", "ttk4115"],
    },
    ttk4215: {
        name: "TTK4215",
        subname: "Adaptiv regulering",
        term: 0,
        topics: [1],
        prerequisites: ["ttk4105", "ttk4115"],
    },
    ttk4105: {
        name: "TTK4105",
        subname: "Reguleringsteknikk",
        term: 1,
        topics: [1, 2, 5],
        prerequisites: ["tma4130"],
    },
    ttk4130: {
        name: "TTK4130",
        subname: "Modellering og simulering",
        term: 1,
        topics: [1, 2, 3, 5],
        prerequisites: ["ttk4105"],
    },
    ttk4135: {
        name: "TTK4135",
        subname: "Optimalisering og regulering",
        term: 1,
        topics: [1],
        prerequisites: ["tma4130", "ttk4105", "ttk4115"],
    },
    ttk4145: {
        name: "TTK4145",
        subname: "Sanntidsprogrammering",
        term: 1,
        topics: [0, 1],
        prerequisites: [],
    },
    ttk4175: {
        name: "TTK4175",
        subname: "Instrumenteringssystemer",
        term: 1,
        topics: [1],
        prerequisites: [],
    },
    ttk4195: {
        name: "TTK4195",
        subname: "Modellering og regulering av roboter",
        term: 1,
        topics: [1, 2, 5],
        prerequisites: ["ttk4105", "ttk4150"],
    },
    ttk4210: {
        name: "TTK4210",
        subname: "Avansert regulering av industrielle prosesser",
        term: 1,
        topics: [1, 2],
        prerequisites: ["ttk4105", "ttk4115"],
    },
    ttk4255: {
        name: "TTK4255",
        subname: "Robotsyn",
        term: 1,
        topics: [1],
        prerequisites: ["tma4130", "ttk4105", "tdt4195"],
    },
    tep4240: {
        name: "TEP4240",
        subname: "Systemsimulering",
        term: 0,
        topics: [2, 3, 5],
        prerequisites: [],
    },
    tpk4120: {
        name: "TPK4120",
        subname: "Industriell sikkerhet og pålitelighet",
        term: 0,
        topics: [8],
        prerequisites: [],
    },
    tpk4125: {
        name: "TPK4125",
        subname: "Mekatronikk",
        term: 0,
        topics: [1, 2, 5],
        prerequisites: [],
    },
    tpk4140: {
        name: "TPK4140",
        subname: "Driftsikkerhet og vedlikeholdsstyring",
        term: 0,
        topics: [1, 2, 8],
        prerequisites: [],
    },
    tpk4141: {
        name: "TPK4141",
        subname: "Innovasjon, design og produksjon 1",
        term: 0,
        topics: [2, 7, 8],
        prerequisites: [],
    },
    tpk4160: {
        name: "TPK4160",
        subname: "Verdikjedestyring",
        term: 0,
        topics: [2, 8],
        prerequisites: [],
    },
    tpk4161: {
        name: "TPK4161",
        subname: "Verdikjedeanalyse",
        term: 0,
        topics: [2, 8],
        prerequisites: [],
    },
    tpk4165: {
        name: "TPK4165",
        subname: "ERP og PLM systemer",
        term: 0,
        topics: [2, 8],
        prerequisites: [],
    },
    tpk4170: {
        name: "TPK4170",
        subname: "Robotteknikk",
        term: 0,
        topics: [1, 2,  5],
        prerequisites: [],
    },
    tpk4450: {
        name: "TPK4450",
        subname: "Datadrevet Prognose",
        term: 0,
        topics: [1, 2, 8],
        prerequisites: [],
    },
    tpk4110: {
        name: "TPK4110",
        subname: "Kvalitets- og prestasjonsfokusert ledelse",
        term: 1,
        topics: [2, 7, 8],
        prerequisites: [],
    },
    tpk4115: {
        name: "TPK4115",
        subname: "Praktisk prosjektledelse",
        term: 1,
        topics: [7, 8],
        prerequisites: [],
    },
    tpk4128: {
        name: "TPK4128",
        subname: "Industriell mekatronikk",
        term: 1,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4131: {
        name: "TPK4131",
        subname: "Design av industrielle logistikksystem",
        term: 1,
        topics: [2, 7, 8],
        prerequisites: [],
    },
    tpk4135: {
        name: "TPK4135",
        subname: "Produksjonslogistikk",
        term: 1,
        topics: [7, 8],
        prerequisites: [],
    },
    tpk4142: {
        name: "TPK4142",
        subname: "Innovasjon, design og produksjon 2",
        term: 1,
        topics: [2, 7, 8],
        prerequisites: [],
    },
    tpk4162: {
        name: "TPK4162",
        subname: "Bærekraftig og teknologisk produksjon og logistikk",
        term: 1,
        topics: [2, 7, 8],
        prerequisites: [],
    },
    tpk4171: {
        name: "TPK4171",
        subname: "Avansert industriell robotteknikk",
        term: 1,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4185: {
        name: "TPK4185",
        subname: "Industriell systemdesign",
        term: 1,
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4115: {
        name: "TMM4115",
        subname: "Produktmodellering",
        term: 0,
        topics: [2, 7, 8],
        prerequisites: [],
    },
    tmm4151: {
        name: "TMM4151",
        subname: "Produkt- og materialtesting",
        term: 0,
        topics: [2, 7, 8],
        prerequisites: [],
    },
    tmm4160: {
        name: "TMM4160",
        subname: "Bruddmekanikk",
        term: 0,
        topics: [2, 6],
        prerequisites: [],
    },
    tmm4170: {
        name: "TMM4170",
        subname: "Korrosjon",
        term: 0,
        topics: [2, 6],
        prerequisites: [],
    },
    tmm4195: {
        name: "TMM4195",
        subname: "Dimensjonering mot utmatting",
        term: 0,
        topics: [2, 6],
        prerequisites: [],
    },
    tmm4112: {
        name: "TMM4112",
        subname: "Maskindeler",
        term: 1,
        topics: [2],
        prerequisites: [],
    },
    tmm4150: {
        name: "TMM4150",
        subname: "Maskinkonstruksjon og mekatronikk",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4135: {
        name: "TMM4135",
        subname: "Dimensjonering basert på elementmetoden",
        term: 0,    
        topics: [2, 5, 6],
        prerequisites: [],
    },
    tmm4100: {
        name: "TMM4100",
        subname: "Materialteknikk",
        term: 1,
        topics: [2],
        prerequisites: [],
    },
    tmm4121: {
        name: "TMM4121",
        subname: "Produktutvikling",
        term: 1,
        topics: [2, 8],
        prerequisites: [],
    },
    tmm4140: {
        name: "TMM4140",
        subname: "Materialers mekaniske oppførsel",
        term: 1,
        topics: [2],
        prerequisites: [],
    },
    tmm4155: {
        name: "TMM4155",
        subname: "Anvendelse av elementmetoden i maskinkonstruksjon",
        term: 1,
        topics: [2, 8],
        prerequisites: [],
    },
}






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

*/