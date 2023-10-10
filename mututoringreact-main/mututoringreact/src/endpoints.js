import axios from 'axios';

const API_HOST = 'http://52.211.109.8'
const V_1 = 'v1'
const PREFIX = `${API_HOST}/api/${V_1}`

const auth = () => {
    return {headers: {
        userid: localStorage.getItem('userId'), 
        usertype: localStorage.getItem('userType'),
        token: localStorage.getItem("token")},    
    }
}

export const checkVerified = (hash) => {
    return axios.get(`${PREFIX}/verifications/${hash}`)
}


////////////////////////////////////////////////////////////////////////////////
//                                 COURSES                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * GET search for a course
 * headers: none
 * @param {string} query - user input
 */
 export const searchCourses = (query) => {
    return axios.get(`${PREFIX}/courses/search/q/${query}`)
}

/**
 * GET search for a modules by course
 * headers: none
 * @param {string} course - course code (e.g. "MH602")
 * @param {string} query - user input
 */
 export const searchModulesByCourse = (course, query) => {
    return axios.get(`${PREFIX}/courses/search/${course}/q/${query}`)
}

/**
 * GET course by code
 * headers: none
 * @param {string} code - course code
 */
export const getCourseByCode = (code) => {
    return axios.get(`${PREFIX}/courses/${code}`)
}

/**
 * GET all courses
 * headers: none
 * @param {string} code - course code
 */
 export const getAllCourses = () => {
    return axios.get(`${PREFIX}/courses/`)
}

/**
 * GET modules for course
 * headers: none
 * @param {string} code - course code
 */
 export const getModulesForCourse = (course) => {
    return axios.get(`${PREFIX}/courses/${course}/modules`)
}

////////////////////////////////////////////////////////////////////////////////
//                                  MODULE                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * GET search for a module
 * headers: none
 * @param {string} query - user input
 */
 export const searchModules = (query) => {
    return axios.get(`${PREFIX}/modules/search/${query}`)
}

/**
 * GET module by code
 * headers: none
 * @param {string} code - module code
 */
 export const getModuleByCode = (module) => {
    return axios.get(`${PREFIX}/modules/${module}`)
}

/**
 * GET tutors for module
 * headers: none
 * @param {string} code - module code
 * output: array of tutors, sorted by rating descending.
 */
 export const getTutorsForModule = (module) => {
    return axios.get(`${PREFIX}/modules/${module}/tutors`)
}

/**
 * GET tutors for module
 * headers: none
 * @param {string} code - module code
 * output: array of tutors, sorted by rating descending.
 */
 export const getModulesByTutor = (id) => {
    return axios.get(`${PREFIX}/modules/tutor/${id}`)
}


/**
 * subscribe tutor to module
 * headers: none
 * @param {string} code - module code
 */
 export const subscribeToModule = (code, id) => {
    return axios.post(`${PREFIX}/modules/${code}/tutors/${id}`, {}, auth())
}

/**
 * unsubscribe tutor from module
 * headers: none
 * @param {string} code - module code
 */
 export const unsubscribeFromModule = (code, id) => {
    return axios.delete(`${PREFIX}/modules/${code}/tutors/${id}`, auth())
}

////////////////////////////////////////////////////////////////////////////////
//                                  TUTORS                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * POST register tutor
 * @param {Object} tutor - {firstName, lastName, email, password}
 * 
 */
export const registerTutor = (tutor) => {
    return axios.post(`${PREFIX}/tutors/register`, tutor)
}

/**
 * POST login tutor
 * @param {Object} tutor - {email, password}
 */
 export const loginTutor = (tutor) => {
    return axios.post(`${PREFIX}/tutors/login`, tutor)
}

/**
 * PUT update tutor
 * @param {string} id - student id
 * body: {firstName, lastName, email, password} - strings, include any of these to update
 */
 export const updateTutor = (tutor, id) => {
    return axios.put(`${PREFIX}/tutors/${id}`, tutor, auth())
}

/**
 * GET tutor
 * @param {string} id - tutor id
 */
 export const getTutor = (id) => {
    return axios.get(`${PREFIX}/tutors/${id}`, auth())
}

/**
 * DELETE tutor
 * @param {string} id - tutor id
 */
 export const deleteTutor = (id) => {
    return axios.delete(`${PREFIX}/tutors/${id}`, auth())
}

////////////////////////////////////////////////////////////////////////////////
//                                STUDENTS                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * POST register student
 * body: {firstName, lastName, email, password} - strings
 */
 export const registerStudent = (student) => {
    return axios.post(`${PREFIX}/students/register`, student)
}

/**
 * POST login student
 * body: {email, password} - strings
 */
 export const loginStudent = (student) => {
    return axios.post(`${PREFIX}/students/login`, student)
}

/**
 * PUT update student
 * @param {string} id - student id
 * body: {firstName, lastName, email, password} - strings, include any of these to update
 */
 export const updateStudent = (student, id) => {
    return axios.put(`${PREFIX}/students/${id}`, student, auth())
}

/**
 * GET student
 * @param {string} id - student id
 */
 export const getStudent = (id) => {
    console.log("token:" + localStorage.getItem('token'))
    return axios.get(`${PREFIX}/students/${id}`, auth())
}

/**
 * DELETE student
 * @param {string} id - student id
 */
 export const deleteStudent = (id) => {
    return axios.delete(`${PREFIX}/tutors/${id}`, auth())
}

////////////////////////////////////////////////////////////////////////////////
//                                 REVIEWS                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * GET review by id
 * @param {string} id - tutor id
 * @param {string} code - module code
 */
 export const getReviewByTutorAndModule = (id, code) => {
    return axios.get(`${PREFIX}/reviews/tutors/${id}/modules/${code}`, auth())
}

/**
 * GET review by tutorId
 * @param {string} id - tutor id
 */
 export const getReviewByTutor = (id) => {
    return axios.get(`${PREFIX}/reviews/tutors/${id}`, auth())
}

/**
 * PUT review
 * @param {string} id - review id
 * @param {Object} review - {rating (1-5), comment - string, anonymous - boolean}
 */
 export const updateReview = (id, review) => {
    return axios.put(`${PREFIX}/reviews/${id}`, review, auth())
}

/**
 * DELETE review
 * @param {string} id - review id
 */
 export const deleteReview = (id) => {
    return axios.delete(`${PREFIX}/reviews/${id}`, auth())
}

/**
 * POST review
 * @param {Object} review - 
 *  {
 *      tutorId: string,
 *      studentId: string,
 *      module: string,
 *      rating: number (1-5),
 *      comment: string, (optional)
 *      anonymous: boolean (optional)
 * }
 */
 export const postReview = (review) => {
    return axios.post(`${PREFIX}/reviews`, review, auth())
}

////////////////////////////////////////////////////////////////////////////////
//                                 TIMETABLES                                 //
////////////////////////////////////////////////////////////////////////////////

/**
 * GET merged timetable for the specified week
 * @param {string} id - student id
 * @param {string} targetId - tutor id
 * @param {string} from - start date ISO_8601 format
 * @param {string} to - end date ISO_8601 format
 * to - from == 7 days (mon - mon)
 */
 export const getMergedTimetable = (id, targetId, from, to) => {
    return axios.get(`${PREFIX}/timetables/merged/${id}/${targetId}/${from}/${to}`, auth())
}

/**
 * GET timetable for tutor for the specified week
 * @param {string} id - tutor id
 * @param {string} from - start date ISO_8601 format
 * @param {string} to - end date ISO_8601 format
 * to - from == 7 days (mon - mon)
 */
 export const getTimetableForTutor = (id, from, to) => {
    return axios.get(`${PREFIX}/timetables/tutors/${id}/${from}/${to}`, auth())
}

/**
 * PUT unavailable time for tutor
 * @param {{[{}]}} unavailabilityRanges - 
 * object where keys are days and values are arrays of {start, end} ranges.
 * make sure days are capitalised (e.g. "Monday") (otherwise the database could get confused)
 * {
 *      tutorId: string,
 *      busy: {
*           "Monday": [
*               {
*               start: "HH:MM:SS",
*               end: "HH:MM:SS"
*               }
*           ],
*           "Tuesday": [...]
*           ...
*       }  
 * }
 */
 export const updateTimetableForTutor = (unavailabilityRanges) => {
    return axios.put(`${PREFIX}/timetables/tutors`, unavailabilityRanges, auth())
}

/**
 * remove unavailable time for tutor
 * * Only full ranges will be removed, partial ones will be ignored.
 * the way to use this endpoint would be to send a the same section 
 * of busy times (as recieved from get)
 * @param {{[{}]}} unavailabilityRanges - 
 * object where keys are days and values are arrays of {start, end} ranges.
 * make sure days are capitalised (e.g. "Monday") (otherwise the database could get confused)
 * {
 *      tutorId: string,
 *      busy: {
*           "Monday": [
*               {
*               start: "HH:MM:SS",
*               end: "HH:MM:SS"
*               }
*           ],
*           "Tuesday": [...]
*           ...
*       }  
 * }
 */
 export const removeRangesInTimetableForTutor = (unavailabilityRanges) => {
    return axios.patch(`${PREFIX}/timetables/tutors`, unavailabilityRanges, auth())
}

/**
 * clear tutor timetable (busy times)
 * @param {string} id 
 * @returns 
 */
 export const clearTimetableForTutor = (id) => {
    return axios.delete(`${PREFIX}/timetables/tutor/clear/${id}`, auth())
}



/**
 * GET timetable for student for the specified week
 * @param {string} id - student id
 * @param {string} from - start date ISO_8601 format
 * @param {string} to - end date ISO_8601 format
 * to - from == 7 days (mon - mon)
 */
 export const getTimetableForStudent = (id, from, to) => {
    return axios.get(`${PREFIX}/timetables/students/${id}/${from}/${to}`, auth())
}

/**
 * PUT unavailable time for student
 * @param {{[{}]}} unavailabilityRanges - 
 * object where keys are days and values are arrays of {start, end} ranges.
 * make sure days are capitalised (e.g. "Monday") (otherwise the database could get confused)
 * {
 *      studentId: string,
 *      busy: {
*           "Monday": [
*               {
*               start: "HH:MM:SS",
*               end: "HH:MM:SS"
*               }
*           ],
*           "Tuesday": [...]
*           ...
*       }
 * }
 */
 export const updateTimetableForStudent = (unavailabilityRanges) => {
    return axios.put(`${PREFIX}/timetables/students`, unavailabilityRanges, auth())
}

/**
 * DELETE unavailable time for student
 * Only full ranges will be removed, partial ones will be ignored.
 * the way to use this endpoint would be to send a the same section 
 * of busy times (as recieved from get)
 * @param {{[{}]}} unavailabilityRanges - 
 * object where keys are days and values are arrays of {start, end} ranges.
 * make sure days are capitalised (e.g. "Monday") (otherwise the database could get confused)
 * {
 *      studentId: string,
 *      busy: {
*           "Monday": [
*               {
*               start: "HH:MM:SS",
*               end: "HH:MM:SS"
*               }
*           ],
*           "Tuesday": [...]
*           ...
*       }  
 * }
 */
 export const removeRangesInTimetableForStudent = (unavailabilityRanges) => {
    return axios.patch(`${PREFIX}/timetables/students`, unavailabilityRanges, auth())
}
/**
 * clear student timetable (busy times)
 * @param {string} id 
 * @returns 
 */
export const clearTimetableForStudent = (id) => {
    return axios.delete(`${PREFIX}/timetables/students/clear/${id}`, auth())
}

////////////////////////////////////////////////////////////////////////////////
//                                   MEETINGS                                 //
////////////////////////////////////////////////////////////////////////////////

/**
 * GET meeting by id
 * @param {string} id - meeting id
 */
export const getMeeting = (id) => {
    return axios.get(`${PREFIX}/meetings/${id}`, auth())
}

/**
 * GET meeting by tutorId and module
 * @param {string} id - tutor id
 * @param {string} module - module code
 */
 export const getMeetingsByTutorAndModule = (id, module) => {
    return axios.get(`${PREFIX}/meetings/tutors/${id}/${module}`, auth())
}

/**
 * GET meeting by tutorId and module
 * @param {string} id - tutor id
 */
 export const getMeetingsByTutor = (id) => {
    return axios.get(`${PREFIX}/meetings/tutors/${id}`, auth())
}

/**
 * GET meeting by student and module
 * @param {string} id - student id
 * @param {string} module - module code
 */
 export const getMeetingsByStudentAndModule = (id, module) => {
    return axios.get(`${PREFIX}/meetings/students/${id}/${module}`, auth())
}

/**
 * GET meeting by tutorId and module
 * @param {string} id - student id
 */
 export const getMeetingsByStudent = (id) => {
    return axios.get(`${PREFIX}/meetings/students/${id}`, auth())
}

/**
 * GET meeting by tutorId and student id
 * @param {string} studentId
 * @param {string} tutorId
 */
 export const getMeetingsBetweenStudentAndTutor = (studentId, tutorId) => {
    return axios.get(`${PREFIX}/meetings/${studentId}/${tutorId}`, auth())
}

/**
 * GET pending meetings by tutorId and module
 * @param {string} id - tutor id
 * @param {string} module - module code
 */
 export const getPendingMeetingsByTutorAndModule = (id, module) => {
    return axios.get(`${PREFIX}/meetings/pending/tutors/${id}/${module}`, auth())
}

/**
 * GET pending meetings by tutorId
 * @param {string} id - tutor id
 */
 export const getPendingMeetingsByTutor = (id) => {
    return axios.get(`${PREFIX}/meetings/pending/tutors/${id}`, auth())
}

/**
 * GET pending meetings by student and module
 * @param {string} id - student id
 * @param {string} module - module code
 */
 export const getPendingMeetingsByStudentAndModule = (id, module) => {
    return axios.get(`${PREFIX}/meetings/pending/students/${id}/${module}`, auth())
}

/**
 * GET pending meetings by studentId
 * @param {string} id - student id
 */
 export const getPendingMeetingsByStudent = (id) => {
    return axios.get(`${PREFIX}/meetings/pending/students/${id}`, auth())
}

/**
 * GET cancelled meetings by tutorId and module
 * @param {string} id - tutor id
 * @param {string} module - module code
 */
 export const getCancelledMeetingsByTutorAndModule = (id, module) => {
    return axios.get(`${PREFIX}/meetings/cancelled/tutors/${id}/${module}`, auth())
}

/**
 * GET cancelled meetings by tutorId
 * @param {string} id - tutor id
 */
 export const getCancelledMeetingsByTutor = (id) => {
    return axios.get(`${PREFIX}/meetings/cancelled/tutors/${id}`, auth())
}

/**
 * GET cancelled meetings by student and module
 * @param {string} id - student id
 * @param {string} module - module code
 */
 export const getCancelledMeetingsByStudentAndModule = (id, module) => {
    return axios.get(`${PREFIX}/meetings/cancelled/students/${id}/${module}`, auth())
}

/**
 * GET cancelled meetings by studentId
 * @param {string} id - student id
 */
 export const getCancelledMeetingsByStudent = (id) => {
    return axios.get(`${PREFIX}/meetings/cancelled/students/${id}`, auth())
}

/**
 * GET completed / confirmed meetings by tutorId and module
 * @param {string} id - tutor id
 * @param {string} module - module code
 */
 export const getConfirmedMeetingsByTutorAndModule = (id, module) => {
    return axios.get(`${PREFIX}/meetings/completed/tutors/${id}/${module}`, auth())
}

/**
 * GET completed / confirmed meetings by tutorId
 * @param {string} id - tutor id
 */
 export const getConfirmedMeetingsByTutor = (id) => {
    return axios.get(`${PREFIX}/meetings/completed/tutors/${id}`, auth())
}

/**
 * GET completed / confirmed meetings by student and module
 * @param {string} id - student id
 * @param {string} module - module code
 */
 export const getConfirmedMeetingsByStudentAndModule = (id, module) => {
    return axios.get(`${PREFIX}/meetings/completed/students/${id}/${module}`, auth())
}

/**
 * GET completed / confirmed meetings by studentId
 * @param {string} id - student id
 */
 export const getConfirmedMeetingsByStudent = (id) => {
    return axios.get(`${PREFIX}/meetings/completed/students/${id}`, auth())
}

/**
 * POST meeting 
 * @param {object} meeting - meeting object
 * {
 *      "tutorId": "string",
 *      "studentId": "string",
 *      "module": "string",
 *      "startDate": "string", ISO 8601 format
 *      "endDate": "string" ISO 8601 format
 * }
 */
export const postMeeting = (meeting) => {
    return axios.post(`${PREFIX}/meetings`, meeting, auth())
}

/**
 * reschedule meeting as student 
 * @param {object} meeting - meeting object
 * {
 *      id: "string", - meeting id
 *      startDate: "string", ISO 8601 format
 *      endDate: "string" ISO 8601 format
 * }
 */
 export const rescheduleAsStudent = (meeting) => {
    return axios.put(`${PREFIX}/meetings/students/reschedule`, meeting, auth())
}

/**
 * reschedule meeting as student 
 * @param {object} meeting - meeting object
 * {
 *      id: "string", - meeting id
 *      startDate: "string", ISO 8601 format
 *      endDate: "string" ISO 8601 format
 *      link: "string"
 *      location: "string" - optional, default online
 *      comment: "string" - optional (comment from tutor)
 * }
 */
 export const rescheduleAsTutor = (meeting) => {
    return axios.put(`${PREFIX}/meetings/tutors/reschedule`, meeting, auth())
}

/**
 * reschedule meeting as student 
 * @param {object} meeting - meeting object
 * {
 *      id: "string" - meeting id
 * }
 */
 export const cancelAsStudent = (meeting) => {
    return axios.put(`${PREFIX}/meetings/students/cancel`, meeting, auth())
}

/**
 * reschedule meeting as student 
 * @param {object} meeting - meeting object
 * {
 *      id: "string" - meeting id
 * }
 */
 export const cancelAsTutor = (meeting) => {
    return axios.put(`${PREFIX}/meetings/tutors/cancel`, meeting, auth())
}

/**
 * confirm meeting as student 
 * @param {object} meeting - meeting object
 * {
 *      id: "string", - meeting id
 * }
 */
 export const confirmAsStudent = (meeting) => {
    return axios.put(`${PREFIX}/meetings/students/confirm`, meeting, auth())
}

/**
 * confirm meeting as student 
 * @param {object} meeting - meeting object
 * {
 *      id: "string", - meeting id
 *      link: "string"
 *      location: "string" - optional, default online
 *      comment: "string" - optional (comment from tutor)
 * }
 */
 export const ConfirmAsTutor = (meeting) => {
    return axios.put(`${PREFIX}/meetings/tutors/confirm`, meeting, auth())
}

