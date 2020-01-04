const recommendedCoursesMaskin = {
    h0: ['tma4130', 'tpk4125', 'tmm4135'],
    v0: ['ttk4105', 'tmm4155'],
    h1: ['ttk4150'],
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

const recommendedCoursesData = {
    h0: ['tdt4165', 'tdt4136'],
    v0: ['tdt4171', 'tdt4240'],
    h1: ['tdt4173'],
    v1: ['tdt4237'],
    h2: [], 
    v2: [],
}

const recommendedCoursesOther = {
    h0: [],
    v0: [],
    h1: [],
    v1: [],
    h2: [], 
    v2: [],
}

export function recommendedCourses(topic) {
    switch(topic) {
        case 0:
            return recommendedCoursesData
        case 1:
            return recommendedCoursesKybernetikk;
        case 2:
            return recommendedCoursesMaskin;
        default:
            return recommendedCoursesOther;
    }
}