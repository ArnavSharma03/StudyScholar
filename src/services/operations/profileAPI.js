import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"

import { profileEndpoints } from "../apis"


const { GET_USER_DETAILS_APT, GET_USER_ENROLLED_COURSES_API } = profileEndpoints;










export async function getUserEnrolledCourses(token) {
    let result = [];
    try{
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API , null, { Authorization: `Bearer ${token}` } )

        if( !response.data.success ){
            throw new Error(response.data.message);
        }
        result = response.data.data;
        console.log("API RESPONSE ISSS--->", response.data);
    }
    catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        console.log(error.message);
        toast.error("Could Not Get Enrolled Courses")
    } 
    return result;
}