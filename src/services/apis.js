const BASE_URL = process.env.REACT_APP_BASE_URL



// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOtp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}





// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
}





// PROFILE ENDPOINTS
export const profileEndpoints = {
    // GET_USER_DETAILS_API: BASE_URL +  "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
}






// COURSE ENDPOINTS
export const courseEndpoints = {
    COURSE_CATEGORIES_API: BASE_URL + "/course/getAllCategories",
    
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",


    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",



    CREATE_SECTION_API: BASE_URL + "/course/createSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",


    CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
}



















// collection of apis for categoires and its functions
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/getAllCategories"
}
