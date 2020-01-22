const mandatoryCoursesMaskin = [
    {
        name: "tma4130",
        year: 0,
    },
    {
        name: "tiø4252",
        year: 0,
    },
]

const mandatoryCoursesGeomatikk = [
    {
        name: "tma4130",
        year: 0,
    },
    {
        name: "tiø4252",
        year: 0,
    },
    {
        name: "tba4231",
        year: 0,
    },
    {
        name: "tba4240",
        year: 0,
    },
    {
        name: "tba4250",
        year: 0,
    },
    {
        name: "tba4236",
        year: 0,
    },
]

const mandatoryCoursesKonstruksjon = [
    {
        name: "tma4130",
        year: 0,
    },
    {
        name: "tiø4252",
        year: 0,
    },
    {
        name: "tkt4180",
        year: 0,
    },
    {
        name: "tkt4124",
        year: 0,
    },
]

const mandatoryCoursesMarin = [
    {
        name: "tma4130",
        year: 0,
    },
    {
        name: "tiø4252",
        year: 0,
    },
    {
        name: "tmr4215",
        year: 1,
    },
    {
        name: "tmr4167",
        year: 0,
    },
]

const mandatoryCoursesPetroleum = [
    {
        name: "tma4130",
        year: 0,
    },
    {
        name: "tiø4252",
        year: 0,
    },
    {
        name: "tpg4105",
        year: 0,
    }
]

const mandatoryCoursesProdled = [
    {
        name: "tma4130",
        year: 0,
    },
    {
        name: "tiø4252",
        year: 0,
    },
    {
        name: "tpk4160",
        year: 1,
    }
]

const mandatoryCoursesOther = [
    {
        name: "tma4130",
        year: 0,
    },
    {
        name: "tiø4252",
        year: 0,
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