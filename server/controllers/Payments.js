const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSenderConnect = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");






/********************************************************************************************************************************/
// Handle to buy multiple courses at single time
/********************************************************************************************************************************/


exports.capturePayment = async( request, respond) => {
    
}











































/********************************************************************************************************************************/
// capturePayment
/********************************************************************************************************************************/


// capture the payment and initiate the Razerpay order

exports.capturePayment = async(request, respond) => {
    try{
        // fetch userId and courseId
        const { courseId  } = request.body;
        const userId = request.user.id;
        if(!courseId || !userId) {
            return respond.status(300).json({
                success:false,
                message:"All Fields are required i.e courseId, userId",
            });
        }
        // check weather courseId is valid or not
        let existingCourseDeatils;
        try{
            existingCourseDeatils = await Course.findById({ _id: courseId});
            if(!existingCourseDeatils) {
                return respond.status(301).json({
                    success:false,
                    message:"Could Not Find the course in database, please check course Id",
                });
            }
            // check weather user already payed for the same course
            const uId = new mongoose.Types.ObjectId(userId);
            // search with help of uId that converted to string ---> objectId
            if(existingCourseDeatils.studentsEnrolled.includes(uId)) {
                return respond.status(304).json({
                    succcess:false,
                    message:"You Are already Registered for the course, please don't try to re Pay",
                });
            } 
        }
        catch(error) {
            return respond.status(303).json({
                success:false,
                message:"Something went wrong while fetching the course details inside nested try catch blocks",
                error:error.message
            });
        }
        // set order inside parameters
        const amount = existingCourseDeatils.price;
        const currency = "INR";
        // create a options -----> using amount, currency
        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId: courseId,         // This is used in signature verification
                userId: userId,
            }
        }
        // create a order
        try{
            // initiate a payment using razerpay
            const payementResponse = await instance.orders.create(options);
            console.log(payementResponse);
        }
        catch(error){
            console.log(error.message);
            respond.status(405).json({
                success:false,
                message:"Not able to Initiate a payment using create method",
                error:error.message,
            });
        }
        // return success flag
        return respond.status(200).json({
            succcess: true,
            message: "Instance created and Order Initiated successfully",
            courseName: existingCourseDeatils.courseName,
            courseDescription: existingCourseDeatils.courseDescription,
            thumbnail: existingCourseDeatils.thumbnail,
            orderId: payementResponse.id,
            currency: paymentResponse.currency,
        })
    }
    catch(error) {
        return respond.status(401).json({
            success:false,
            message:"Something went wrong While Capture the payment",
            error:error.message
        });
    }
};



























/********************************************************************************************************************************/
// verifySignature
/********************************************************************************************************************************/




// verify Signature of Razerpay and Server
exports.verifySignature = async(request, respond) => {
    const webhookSecret = "12345678";
    const signature = request.headers["x-razerpay-signature"];
    // now convert webhooksecret
    const shasum = crypto.createHmaca("sha256", webhookSecret);
    shasum.update(JSON.stringify(request.body));
    const digest = shasum.digest("hex");
    // now check Signature are equal or not
    if(signature == digest) {
        console.log("Payment is Authorized");
        const {courseId, userId} = request.body.payload.payment.entity.notes;
        try {
            // user ko course m enroll karo
            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId}, {$push: {studentsEnrolled: userId}}, {new:true});
            if(!enrolledCourse) {
                return respond.status(500).json({
                    success:false,
                    message:"Course Not Found",
                });
            }
            // find student and add course to their courses
            const enrolledStudent = await User.findByIdAndUpdate({_id:userId}, {$push: {courses: courseId}}, {new:true});
            // send confirmation mail 
            const emailResponse = await mailSenderConnect(
                enrolledCourse.email,
                "Conguratulations from Hitendra/Edtech Master",
                "Conguratulations, You are successfully registered in Course",
            )
            console.log(emailResponse);
            return respond.status(200).json({
                success:true,
                message:"Signature verified and course added",
            });
        }
        catch(error) {
            console.log(error);
            return respond.status(400).json({
                success:false,
                data:"Internal server error",
                message:"Something went wrong while verify signature",
                error:error.message,
            });
        }
    }
    else{
        return respond.status(300).json({
            success:false,
            message:"Invalid Response",
        });
    }
}

























































































































// // capture the payment and initiate the razerpay order
// exports.capturePayemnt = async(request, respond) => {
//     try{
//         // get courseId and UserId
//         const {course_id} = request.body;
//         const userId = request.user.id;
//         // validation // valid courseId
//         if(!course_id || !userId) {
//             return respond.status(401).json({
//                 success:false,
//                 message:"Please Provide Valid couse id",
//             });
//         }
//         // valid existingCourseDetails
//         let existingCourseDetails;
//         try{
//             existingCourseDetails = await Course.findById({_id:course_id});
//             if(!existingCourseDetails) {
//                 return respond.status(402).json({
//                     success:false,
//                     nessage:"Could Not Find the course",
//                 });
//             }
//             const uid = new mongoose.Types.ObjectId(userId);
//             // user already pay for the same course
//             if(existingCourseDetails.studentsEnrolled.includes(uid)){
//                 return respond.status(200).json({
//                     success:false,
//                     message:"Students is already enrolled",
//                 });
//             }
//         }
//         catch(error) {
//             console.log(error);
//             return respond.status(400).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//         // create order
//         const amount = existingCourseDetails.price;
//         const currency = "INR";
//         const options = {
//             amount: amount * 100,
//             currency: currency,
//             receipt: Math.random(Date.now()).toString,
//             notes: {                    // This is used in signature verification
//                 courseId: course_id,
//                 userId,
//             }
//         };
//         try{
//             // initiate the payement using razerpay 
//             const payementResponse = await instance.orders.create(options);
//             console.log(payementResponse);
//             // return succces flag
//             return respond.status(200).json({
//                 success:false,
//                 courseName: existingCourseDetails.courseName,
//                 courseDescription:existingCourseDetails.courseDescription,
//                 thumbnail: existingCourseDetails.thumbnail,
//                 orderId: payementResponse.id,
//                 currency: payementResponse.currency,
//                 amount : payementResponse.amount,
//             });
//         }
//         catch(error){
//             console.log(error);
//             respond.status(405).json({
//                 success:false,
//                 message:"Could not initiate order",
//             });
//         }
//         // return response
//     }
//     catch(error) {
//         console.log(error);
//         return respond.status(400).json({
//             success:false,
//             data:"Internal server error",
//             message:"Something went wrong while creating order",
//             error:error.message,
//         });
//     }
// }

// // verify Signature of Razerpay and Server
// exports.verifySignature = async(request, respond) => {
//     const webhookSecret = "12345678";
//     const signature = request.headers["x-razerpay-signature"];
//     // now convert webhooksecret
//     const shasum = crypto.createHmaca("sha256", webhookSecret);
//     shasum.update(JSON.stringify(request.body));
//     const digest = shasum.digest("hex");
//     // now check Signature are equal or not
//     if(signature == digest) {
//         console.log("Payment is Authorized");
//         const {courseId, userId} = request.body.payload.payment.entity.notes;
//         try {
//             // user ko course m enroll karo
//             const enrolledCourse = await Course.findOneAndUpdate({_id:courseId}, {$push: {studentsEnrolled: userId}}, {new:true});
//             if(!enrolledCourse) {
//                 return respond.status(500).json({
//                     success:false,
//                     message:"Course Not Found",
//                 });
//             }
//             // find student and add course to their courses
//             const enrolledStudent = await User.findByIdAndUpdate({_id:userId}, {$push: {courses: courseId}}, {new:true});
//             // send confirmation mail 
//             const emailResponse = await mailSenderConnect(
//                 enrolledCourse.email,
//                 "Conguratulations from Hitendra/Edtech Master",
//                 "Conguratulations, You are successfully registered in Course",
//             )
//             console.log(emailResponse);
//             return respond.status(200).json({
//                 success:true,
//                 message:"Signature verified and course added",
//             });
//         }
//         catch(error) {
//             console.log(error);
//             return respond.status(400).json({
//                 success:false,
//                 data:"Internal server error",
//                 message:"Something went wrong while verify signature",
//                 error:error.message,
//             });
//         }
//     }
//     else{
//         return respond.status(300).json({
//             success:false,
//             message:"Invalid Response",
//         });
//     }
// }

