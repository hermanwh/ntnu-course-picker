/*
    Topics: used to filter courses based on user interests

    When adding a topic, remember to adjust:
    - topics (array)
    - topicNames (map)
    - topicColors (map)
    - topicsOptions (array)
*/

export const topics = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const topicNames = {
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

export const topicNames_new = {
    0: "Data/IT",
    1: "Maskinlæring/AI",
    2: "Database",
    3: "Matematikk",
    4: "Numerikk",
    5: "Statistikk",
    6: "Produktutvikling",
    7: "Produksjon",
    8: "Innovasjon",
    9: "Vedlikehold",
    10: "Ledelse",
    11: "Robotikk & mekatronikk",
    12: "Kybernetikk",
    13: "Konstruksjonsmekanikk",
    14: "Materialer",
    15: "Seismikk",
    16: "Olje & gass",
    17: "Prosessteknikk",
    18: "Geoteknikk",
    19: "Bygg, veg & anlegg",
    20: "Strømning",
    21: "Fluid- & termodynamikk",
    22: "Hydro",
    23: "Marin kunstruksjonsmekanikk",
    24: "Marin kybernetikk",
    25: "Entreprenørskap",
    26: "Økonomi",
    27: "K-emne",
}

// Used to identify the different topics by color
export const topicColors = {
    0: "black",
    1: "#1821E6",
    2: "#C21414",
    3: "#33C50A",
    4: "#464350",
    5: "#127894",
    6: "#2b4f33",
    7: "#01D8BE",
    8: "#A301D8",
    9: "#3E1818",
    10: "#8B6AC3",
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