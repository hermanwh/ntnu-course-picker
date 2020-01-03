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
    */
