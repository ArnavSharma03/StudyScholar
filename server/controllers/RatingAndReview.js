const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");









/********************************************************************************************************************************/
// createRating and Review
/********************************************************************************************************************************/



exports.createRating = async(request, respond) => {
    try{
        // fetch incoming details
        const {courseId, rating, review} = request.body;
        // fetch user id
        const {userId} = request.user.id;
        // check input fields are empty or not
        if(!courseId || !rating || !review || !userId) {
            return respond.status(301).json({
                success:false,
                message:"All fields are required"
            });
        }
        // Check for student is enrolled or not ---> only those student allow to rate those are enrolled
        const enrolledStudent = await Course.findById({_id:courseId , enrolledStudent: { $elemMatch: {$eq: userId}} });
        if(!enrolledStudent) {
            return respond.status(301).json({
                success:false,
                message:"Sorry You are Not Allowed To Rate This course Enroll in course first",
            });
        }
        // check user already rated the course
        const existingRating = await RatingAndReview.findOne({ user:userId , course:courseId});
        if(existingRating) {
            return respond.status(302).json({
                success:false,
                message:"You already rated the course, you are not allowed to update the Ratings",
            });
        }
        // save a entry in db
        const newRatingAndReview = await RatingAndReview.create({
            user:userId,
            rating,
            review,
            course:courseId,
        });
        // update the reference in course Schema
        const updatedCourseWithNewRatingAndReview = await Course.findByIdAndUpdate({ _id:courseId} , {$push: {ratingAndReviews: newRatingAndReview._id}} , {new:true}).populate("ratingAndReview").exec();
        // return response
        return respond.status(200).json({
            success:true,
            message:"New Rating And Review created successfully",
            body:newRatingAndReview,
            updatedCourse:updatedCourseWithNewRatingAndReview,
        });
    }
    catch(error) {
        return respond.status(401).json({
            success:false,
            message:"Internal server error, something went wrong while rating creation"
        })
    }
}

















/********************************************************************************************************************************/
// find average Rating ---> getAverageRating
/********************************************************************************************************************************/



exports.getAverageRating = async(request, respond) => {
    try{
        // get couere id
        const { courseId } = request.body;
        // check input fields is empty of not
        if( !courseId ) {
            return respond.status(400).json({
                success:false,
                message:"All Fields are requied ie. courseId",
            });
        }
        // find average rating using aggregate operator
        const result = await RatingAndReview.aggregate([
            { $match:{ course:new mongoose.Types.ObjectId(courseId), } },
            { $group:{ _id:null, averageRating: {$avg: "$rating"}, } }
        ])
        // return rating
        if(result.length > 0) {
            return respond.status(200).json({
                success:true,
                message:"Average Rating Fetched successfully",
                averageRating:result[0].averageRating,
            });
        } 
        // if no rating and reviews
        return respond.status(200).json({
            success:false,
            message:"Average rating is 0 as no rating is given now",
            averageRating:0,
        })
    }
    catch(error){
        respond.status(300).json({
            success:false,
            message:"Internal Server error Something went wrong while finding average ratings",
            error:error.message,
        });
    }
}



















/********************************************************************************************************************************/
// getAllRatings
/********************************************************************************************************************************/


exports.getAllRating = async(request, respond) => {
    try{
        // extract all rating and reviews from db
        const allReviews = await RatingAndReview.find({}).sort( {rating:"desc"} )
        .populate( { path:"user" , select:"firstName lastName email image"} )
        .populate( { path:"course" , select:"courseName"}).exec();
        // return response
        return respond.status(200).json({
            success:true,
            message:"All rating And Reviews fetched successfully",
            body:allReviews
        });
    }
    catch(error){
        respond.status(300).json({
            success:false,
            message:"Internal Server error, Something went wrong while fectching all ratings",
            error:error.message,
        });
    }
}





































// // create rating and review
// exports.createRating = async(request, respond ) => {
//     try{
//         // get user id
//         const userId = request.id;
//         // get rating , review and course 
//         const {courseId, rating, review } = request.body;
//         // check if user is enrolled or not
//         const courseDetails = await Course.findById({_id:courseId, studentEnrolled: {$elemMatch: {$eq: userId}}});
//         if(!courseDetails) {
//             return respond.status(404).json({
//                 success:false,
//                 message:"Students is not enrolled in the course",
//             })
//         }
//         // check if user already review the course
//         const checkAlreadyReviewd = await RatingAndReview.findOne({user:userId, course:courseId});
//         if(checkAlreadyReviewd) {
//             return respond.status(300).json({
//                 success:false,
//                 message:"Course is already reviewed by the user",
//             })
//         }
//         // create a rating and review
//         const newRatingAndReview = await RatingAndReview.create({
//             user:userId,
//             rating:rating,
//             review:review,
//             course:courseId,
//         });
//         // update ref in Course
//         const updatedCourseWithNewRatingAndReview = await Course.findByIdAndUpdate({_id:courseId}, {$push: {ratingAndReviews: newRatingAndReview._id}}, {new:true});
//         // send success flag
//         respond.status(200).json({
//             success:true,
//             message:"Rating and Review created successfully",
//             data:newRatingAndReview,
//         })
//     }
//     catch(error){
//         respond.status(300).json({
//             success:false,
//             message:"Internal Server error",
//             error:error.message,
//         });
//     }
// }


// /********************************************************************************************************************* */

// // find average rating

// exports.getAverageRating = async(request, respond) => {
//     try{
//         // get courseId
//         const {courseId} = request.body;
//         // calculate average rating
//         const result = await RatingAndReview.aggregate([
//             {
//                 $math:{
//                     course: new mongoose.Types.ObjectOd(courseId),
//                 },
//             },
//             {
//                 $group: {
//                     _id:null,
//                     averageRating: {$avg: "$rating"},
//                 }
//             }
//         ])
//         // return rating
//         if(result.length > 0) {
//             return respond.status(200).json({
//                 success:true,
//                 averageRating:result[0].averageRating,
//             });
//         } 
//         // if no rating and reviews
//         return respond.status(200).json({
//             success:false,
//             message:"Average rating is 0 as no rating is given now",
//             averageRating:0,
//         })
//     }
//     catch(error){
//         respond.status(300).json({
//             success:false,
//             message:"Internal Server error",
//             error:error.message,
//         });
//     }
// }

// /*********************************************************************************************************************/

// // getAllRatings
// exports.getAllRating = async(request, respond) => {
//     try{
//         const allReviews = await RatingAndReview.find({}).sort({rating:"desc"})
//             .populate({
//                 path:"user",
//                 select:"firstName lastName email image",
//             }).populate({
//                 path:"course",
//                 select:"courseName",
//             }).exec();
        
//         return respond.status(200).json({
//             success:false,
//             message:"All course details fetched successfully",
//             data:allReviews,
//         });
//     }
//     catch(error){
//         respond.status(300).json({
//             success:false,
//             message:"Internal Server error",
//             error:error.message,
//         });
//     }
// }
