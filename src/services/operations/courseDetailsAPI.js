import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";

import { courseEndpoints } from "../apis";



// CATEGORIES + INSTRUCTOR APIS
const { COURSE_CATEGORIES_API , GET_ALL_INSTRUCTOR_COURSES_API} = courseEndpoints;



// COURSES
const { CREATE_COURSE_API, EDIT_COURSE_API , DELETE_COURSE_API } = courseEndpoints;
const { GET_FULL_COURSE_DETAILS_AUTHENTICATED } = courseEndpoints;



// SECTIONS
const { CREATE_SECTION_API, UPDATE_SECTION_API, DELETE_SECTION_API } = courseEndpoints;



// SUBSECTIONS
const { CREATE_SUBSECTION_API, UPDATE_SUBSECTION_API, DELETE_SUBSECTION_API } = courseEndpoints;















// getAllCategories
export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        console.log("COURSE_CATEGORIES_API API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data;
    } 
    catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result;
}


















// createCourse
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`, })
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } 
    catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

















// edit the course details
export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        // MODIFIED API CALL FOR THUMBNIAL UPLOAD
        const response = await apiConnector("POST", EDIT_COURSE_API, data, { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`, })
        console.log("EDIT COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } 
    catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


















// delete course 
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, { Authorization: `Bearer ${token}` });
            console.log("DELETE COURSE API RESPONSE............", response);
            if (!response?.data?.success) {
                throw new Error("Could Not Delete Course");
    }
    toast.success("Course Deleted");
    } 
    catch (error) {
        console.log("DELETE COURSE API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}






















// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
    //console.log("course------------------", courseId);
    const toastId = toast.loading("Loading...");
    //   dispatch(setLoading(true));
    let result = null;
    try {
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, { courseId }, { Authorization: `Bearer ${token}` } );
        console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
        console.log("get Full details---> API Result-----> ", result);
    } 
    catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
        result = error.response.data;
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    //   dispatch(setLoading(false));
    return result;
}
























// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector( "GET", GET_ALL_INSTRUCTOR_COURSES_API, null, { Authorization: `Bearer ${token}` } );
        console.log("INSTRUCTOR COURSES API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses");
        }
        result = response?.data?.data;
    } 
    catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

























// create Section API
export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", CREATE_SECTION_API, data, { Authorization: `Bearer ${token}`, })
        console.log("CREATE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture");
        }
        toast.success("Lecture Added");
        result = response?.data?.data;
    }
    catch(error) {
        console.log("CREATE SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}



















// update Section API
export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", UPDATE_SECTION_API , data, { Authorization: `Bearer ${token}`, })
        console.log("UPDATE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section");
        }
        toast.success("Course Section Updated");
        result = response?.data?.data;
    }
    catch(error) {
        console.log("UPDATE SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


















// delete Section API
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...");
    console.log(token);
    try {
        const response = await apiConnector("DELETE", DELETE_SECTION_API, data, { Authorization: `Bearer ${token}`})
        console.log("DELETE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted")
        result = response?.data?.data
    } 
    catch (error) {
        console.log("DELETE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}



















// create subSection API
export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, { Authorization: `Bearer ${token}` });
        console.log("CREATE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture")
        }
        toast.success("Lecture Added");
        result = response?.data?.data;
    }
    catch(error) {
        console.log("CREATE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}




















// update subSection API
export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, { Authorization: `Bearer ${token}`, });
        console.log("UPDATE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }
        toast.success("Lecture Updated");
        result = response?.data?.data;
    } 
    catch (error) {
        console.log("UPDATE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}














// delete a subsection
export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, { Authorization: `Bearer ${token}`, });
        console.log("DELETE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture");
    }
        toast.success("Lecture Deleted")
        result = response?.data?.data
    } 
    catch (error) {
        console.log("DELETE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}