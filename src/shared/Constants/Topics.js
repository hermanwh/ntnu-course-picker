/*
    Topics: used to filter courses based on user interests

    When adding a topic, remember to adjust:
    - topics (array)
    - topicNames (map)
    - topicColors (map)
    - topicsOptions (array)
*/

export const topics_old = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const topics = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]

export const topicNames_old = {
    0: "Data/IT",
    1: "Kybernetikk",
    2: "Maskinteknikk",
    3: "Prosessteknikk",
    4: "Maskinlæring/AI",
    5: "Marin teknikk",
    6: "Byggteknikk",
    7: "Innovasjon",
    8: "Vedlikehold",
    9: "K-emne",
    10: "Matematikk",
}

export const topicNames = {
    0: "Informasjonsteknologi",
    1: "Maskinlæring & AI",
    2: "Database",
    3: "Statistikk",
    4: "Matematikk",
    5: "Numerikk",
    6: "Produktutvikling",
    7: "Produksjon",
    8: "Innovasjon",
    9: "Vedlikehold",
    10: "Robotikk & mekatronikk",
    11: "Kybernetikk",
    12: "Marin kybernetikk",
    13: "Marine kunstruksjoner",
    14: "Hydro",
    15: "Fluid- & termodynamikk",
    16: "Prosessteknikk",
    17: "Olje & gass",
    18: "Seismikk",
    19: "Geoteknikk",
    20: "Bygg, veg & anlegg",
    21: "Konstruksjonsmekanikk",
    22: "Materialer",
    23: "Ledelse/Økonomi/Entreprenørskap",
    24: "K-emne",
    25: "EIT-emne",
}

// Used to identify the different topics by color
export const topicColors_old = {
    1: "#1891ac",
    2: "#1f5f8b",
    3: "#253b6e",
    4: "#29a19c",
    5: "#ee4540",
    6: "#e84545",
    7: "#e23e57",
    8: "#88304e",
    9: "#522546",
    10: "#311d3f",
}

export const topicColors = {
    0: 'black',
    1: "#222831",
    2: "#393e46",
    3: "#40514e",
    4: "#11999e",
    5: "#46cdcf",
    6: "#e84545",
    7: "#e23e57",
    8: "#88304e",
    9: "#522546",
    10: "#311d3f",
    11: "#590d82",
    12: "#5d52bf",
    13: "#1f5f8b",
    14: "#071a52",
    15: "#129661",
    16: "#08726b",
    17: "#087232",
    18: "#215906",
    19: "#383e18",
    20: "#ab9400",
    21: "#fda403",
    22: "#e8751a",
    23: "#595454",
    24: "#595454",
    25: "#595454",
}

// Used for options in the topics multiselect from the react-select package
export const topicsOptions = [
    {value: 0, label: topicNames[0], color: topicColors[0]},
    {value: 1, label: topicNames[1], color: topicColors[1]},
    {value: 2, label: topicNames[2], color: topicColors[2]},
    {value: 3, label: topicNames[3], color: topicColors[3]},
    {value: 4, label: topicNames[4], color: topicColors[4]},
    {value: 5, label: topicNames[5], color: topicColors[5]},
    {value: 6, label: topicNames[6], color: topicColors[6]},
    {value: 7, label: topicNames[7], color: topicColors[7]},
    {value: 8, label: topicNames[8], color: topicColors[8]},
    {value: 9, label: topicNames[9], color: topicColors[9]},
    {value: 10, label: topicNames[10], color: topicColors[10]},
    {value: 11, label: topicNames[11], color: topicColors[11]},
    {value: 12, label: topicNames[12], color: topicColors[12]},
    {value: 13, label: topicNames[13], color: topicColors[13]},
    {value: 14, label: topicNames[14], color: topicColors[14]},
    {value: 15, label: topicNames[15], color: topicColors[15]},
    {value: 16, label: topicNames[16], color: topicColors[16]},
    {value: 17, label: topicNames[17], color: topicColors[17]},
    {value: 18, label: topicNames[18], color: topicColors[18]},
    {value: 19, label: topicNames[19], color: topicColors[19]},
    {value: 20, label: topicNames[20], color: topicColors[20]},
    {value: 21, label: topicNames[21], color: topicColors[21]},
    {value: 22, label: topicNames[22], color: topicColors[22]},
    {value: 23, label: topicNames[23], color: topicColors[23]},
    {value: 24, label: topicNames[24], color: topicColors[24]},
    {value: 25, label: topicNames[25], color: topicColors[25]},
]

export const topicsOptions_new = [

]

// Used to style the topics multiselect from the react-select package
export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data }) => {
        return {
        ...styles,
        color: data.color,
        };
    },
    multiValue: (styles, { data }) => {
        return {
        ...styles,
        color: data.color,
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
        backgroundColor: data.color,
        color: 'white',
        },
    }),
}