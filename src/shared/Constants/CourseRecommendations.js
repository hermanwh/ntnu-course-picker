const recommendedCoursesMaskin = {
    h0: ['tpk4125', 'tmm4135'],
    v0: ['ttk4105', 'tmm4155'],
    h1: [],
    v1: [],
    h2: [], 
    v2: [],
}

const recommendedCoursesKybernetikk = {
    h0: ['tma4130', 'tpk4125'],
    v0: ['ttk4105', 'ttk4145'],
    h1: ['ttk4115', 'ttk4147'],
    v1: ['ttk4130', 'ttk4135'],
    h2: ['ttk4150', 'ttk4190'], 
    v2: [],
}

const recommendedCoursesML = {
    h0: ['tdt4136'],
    v0: ['tdt4171', 'tdt4240', 'tdt4300'],
    h1: ['tdt4173'],
    v1: ['tdt4265'],
    h2: [], 
    v2: [],
}

const recommendedCoursesDatabase = {
    h0: ['tdt4117', 'tdt4225'],
    v0: ['tdt4150', 'tdt4305', 'tdt4300'],
    h1: [],
    v1: [],
    h2: [], 
    v2: [],
}


const recommendedCoursesOther = null;

export function recommendedCourses(topic) {
    switch(topic) {
        case 1:
            return recommendedCoursesML;
        case 2:
            return recommendedCoursesDatabase;
        case 11:
            return recommendedCoursesKybernetikk;
        default:
            return recommendedCoursesOther;
    }
}