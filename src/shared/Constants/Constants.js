export const terms = {
    1: "høst",
    2: "vår"
}

export const specializationNames = {
    0: "IKT og maskinteknikk",
    1: "IKT og produksjonsledelse",
    2: "IKT og petroleumsteknikk",
    3: "IKT og konstruksjonsteknikk",
    4: "IKT og marin teknikk",
    5: "Geomatikk"
}

export const specializations = [0, 1, 2, 3, 4, 5]

export const topicNames = {
    0: "Computer science",
    1: "Cybernetics",
    2: "Mechanics",
    3: "Process engineering",
}

export const topics = [0, 1, 2, 3]

export const courses = {
    tdt4225: {
        name: "TDT4225",
        subname: "Store distribuerte datamengder",
        term: 1,
        topics: [0],
    },
    tdt4165: {
        name: "TDT4165",
        subname: "Programmeringsspråk",
        term: 1,
        topics: [0],
    },
    tkt4105: {
        name: "TKT4105",
        subname: "Reguleringsteknikk",
        term: 2,
        topics: [1],
    },
    tep4240: {
        name: "TEP4240",
        subname: "Systemsimulering",
        term: 1,
        topics: [0,2,3],
    },
    tpk4135: {
        name: "TPK4135",
        subname: "Robotteknikk",
        term: 1,
        topics: [1, 2],
    },
    tkt4110: {
        name: "TKT4110",
        subname: "Lineær systemteori",
        term: 1,
        topics: [1],
    }
}