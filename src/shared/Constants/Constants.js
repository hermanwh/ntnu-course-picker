export const terms = {
    0: "høst",
    1: "vår"
}

export const specializationNames = {
    0: "IKT og maskinteknikk",
    1: "IKT og produksjonsledelse",
    2: "IKT og petroleumsteknikk",
    3: "IKT og konstruksjonsteknikk",
    4: "IKT og marin teknikk",
    5: "Geomatikk"
}

export const specializationOptions = [
    {value: 0, label: 'IKT og maskinteknikk'},
    {value: 1, label: 'IKT og produksjonsledelse'},
    {value: 2, label: 'IKT og petroleumteknikk'},
    {value: 3, label: 'IKT og konstruksjonsteknikk'},
    {value: 4, label: 'IKT og marin teknikk'},
    {value: 5, label: 'Geomatikk'},       
]

export const specializations = [0, 1, 2, 3, 4, 5]

export const topicNames = {
    0: "Computer science",
    1: "Cybernetics",
    2: "Mechanics",
    3: "Process engineering",
}

export const topicColors = {
    0: "white",
    1: "blue",
    2: "red",
    3: "green",
}

export const topicsOptions = [
    {value: 0, label: 'Data/IT'},
    {value: 1, label: 'Kybernetikk'},
    {value: 2, label: 'Maskinfag'},
    {value: 3, label: 'Prosessteknikk'},
]

export const topics = [0, 1, 2, 3]

const mandatoryCoursesMaskin = {
    tma4130: {
        name: "tma4130",
        year: 0,
    },
    tiø4258: {
        name: "tiø4258",
        year: 0,
    },
    tmr4160: {
        name: "tmr4160",
        year: 1,
    },
}

const mandatoryCoursesOther = {
    tma4130: {
        name: "tma4130",
        year: 0,
    },
    tiø4258: {
        name: "tiø4258",
        year: 0,
    },
}

export function mandatoryCourses(specialization) {
    switch(specialization) {
        case 0:
            return mandatoryCoursesMaskin;
        default:
            return mandatoryCoursesOther;
    }
}

export const courses = {
    tma4130: {
        name: "TMA4130",
        subname: "Matematikk 4N",
        term: 0,
        topics: [2, 3],
        prerequisites: [],
    },
    tiø4258: {
        name: "TIØ4258",
        subname: "Teknologiledelse",
        term: 0,
        topics: [2, 3],
        prerequisites: [],
    },
    tmr4160: {
        name: "TMR4160",
        subname: "Datametoder for ingeniørtekniske anvendelser",
        term: 1,
        topics: [2, 3],
        prerequisites: [],
    },
    tdt4136: {
        name: "TDT4136",
        subname: "Introduksjon til kunstig intelligens",
        term: 0,
        topics: [0],
        prerequisites: [],
    },
    tdt4137: {
        name: "TDT4137",
        subname: "Kognitive arkitekturer",
        term: 0,
        topics: [0],
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
        topics: [0],
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
        topics: [0],
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
        topics: [0],
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
        topics: [0],
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
        topics: [1],
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
        topics: [1],
        prerequisites: ["ttk4105", "ttk4115"],
    },
    ttk4155: {
        name: "TTK4155",
        subname: "Industrielle og innebygde datasystemers konstruksjon",
        term: 0,
        topics: [1],
        prerequisites: [],
    },
    ttk4190: {
        name: "TTK4190",
        subname: "Fartøystyring",
        term: 0,
        topics: [1],
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
        topics: [1],
        prerequisites: ["tma4130"],
    },
    ttk4130: {
        name: "TTK4130",
        subname: "Modellering og simulering",
        term: 1,
        topics: [1],
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
        topics: [1],
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
        topics: [1],
        prerequisites: ["ttk4105", "ttk4150"],
    },
    ttk4210: {
        name: "TTK4210",
        subname: "Avansert regulering av industrielle prosesser",
        term: 1,
        topics: [1],
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
        topics: [0,2,3],
        prerequisites: [],
    },
    tpk4120: {
        name: "TPK4120",
        subname: "Industriell sikkerhet og pålitelighet",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4125: {
        name: "TPK4125",
        subname: "Mekatronikk",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4140: {
        name: "TPK4140",
        subname: "Driftsikkerhet og vedlikeholdsstyring",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4141: {
        name: "TPK4141",
        subname: "Innovasjon, design og produksjon 1",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4160: {
        name: "TPK4160",
        subname: "Verdikjedestyring",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4161: {
        name: "TPK4161",
        subname: "Verdikjedeanalyse",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4165: {
        name: "TPK4165",
        subname: "ERP og PLM systemer",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4170: {
        name: "TPK4170",
        subname: "Robotteknikk",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4450: {
        name: "TPK4450",
        subname: "Datadrevet Prognose",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4110: {
        name: "TPK4110",
        subname: "Kvalitets- og prestasjonsfokusert ledelse",
        term: 1,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4115: {
        name: "TPK4115",
        subname: "Praktisk prosjektledelse",
        term: 1,
        topics: [1, 2],
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
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4135: {
        name: "TPK4135",
        subname: "Produksjonslogistikk",
        term: 1,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4142: {
        name: "TPK4142",
        subname: "Innovasjon, design og produksjon 2",
        term: 1,
        topics: [1, 2],
        prerequisites: [],
    },
    tpk4162: {
        name: "TPK4162",
        subname: "Bærekraftig og teknologisk produksjon og logistikk",
        term: 1,
        topics: [1, 2],
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
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4151: {
        name: "TMM4151",
        subname: "Produkt- og materialtesting",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4160: {
        name: "TMM4160",
        subname: "Bruddmekanikk",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4170: {
        name: "TMM4170",
        subname: "Korrosjon",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4195: {
        name: "TMM4195",
        subname: "Dimensjonering mot utmatting",
        term: 0,
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4112: {
        name: "TMM4112",
        subname: "Maskindeler",
        term: 1,
        topics: [1, 2],
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
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4100: {
        name: "TMM4100",
        subname: "Materialteknikk",
        term: 1,
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4121: {
        name: "TMM4121",
        subname: "Produktutvikling",
        term: 1,
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4140: {
        name: "TMM4140",
        subname: "Materialers mekaniske oppførsel",
        term: 1,
        topics: [1, 2],
        prerequisites: [],
    },
    tmm4155: {
        name: "TMM4155",
        subname: "Anvendelse av elementmetoden i maskinkonstruksjon",
        term: 1,
        topics: [1, 2],
        prerequisites: [],
    },
}