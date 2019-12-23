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
    */

*/