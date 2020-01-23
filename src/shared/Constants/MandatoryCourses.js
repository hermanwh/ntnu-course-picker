const mandatoryCoursesMaskin = [
    {
        name: "tma4130",
        year: 0,
        term: 0,
    },
    {
        name: "tiø4252",
        year: 0,
        term: 1,
    },
]

const mandatoryCoursesGeomatikk = [
    {
        name: "tma4130",
        year: 0,
        term: 0,
    },
    {
        name: "tba4231",
        year: 0,
        term: 0,
    },
    {
        name: "tba4240",
        year: 0,
        term: 0,
    },
    {
        name: "tiø4252",
        year: 0,
        term: 1,
    },
    {
        name: "tba4236",
        year: 0,
        term: 1,
    },
    {
        name: "tba4250",
        year: 0,
        term: 1,
    },
]

const mandatoryCoursesKonstruksjon = [
    {
        name: "tma4130",
        year: 0,
        term: 0,
    },
    {
        name: "tiø4252",
        year: 0,
        term: 1,
    },
]

const mandatoryCoursesMarin = [
    {
        name: "tma4130",
        year: 0,
        term: 0,
    },
    {
        name: "tiø4252",
        year: 0,
        term: 1,
    },
    {
        name: "tmr4167",
        year: 0,
        term: 0,
    },
]

const mandatoryCoursesPetroleum = [
    {
        name: "tma4130",
        year: 0,
        term: 0,
    },
    {
        name: "tiø4252",
        year: 0,
        term: 1,
    },
    {
        name: "tpg4105",
        year: 0,
        term: 0,
    }
]

const mandatoryCoursesProdled = [
    {
        name: "tma4130",
        year: 0,
        term: 0,
    },
    {
        name: "tpk4165",
        year: 0,
        term: 0,
    },
    {
        name: "tiø4252",
        year: 0,
        term: 1,
    },
    {
        name: "tpk4135",
        year: 0,
        term: 1,
    }
]

const mandatoryCoursesOther = [
    {
        name: "tma4130",
        year: 0,
        term: 0,
    },
    {
        name: "tiø4252",
        year: 0,
        term: 1,
    },
]

export function mandatoryCourses(specialization) {
    console.log(specialization);
    switch(specialization) {
        case 0:
            return mandatoryCoursesMaskin;
        case 1:
            return mandatoryCoursesProdled;
        case 2:
            return mandatoryCoursesPetroleum;
        case 3:
            return mandatoryCoursesKonstruksjon;
        case 4:
            return mandatoryCoursesMarin;
        case 5:
            return mandatoryCoursesGeomatikk;
        default:
            return mandatoryCoursesOther;
    }
}