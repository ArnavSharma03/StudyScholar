const express = require("express");
const router = express.Router();


const {auth , isAdmin , isStudent , isInstructor} = require("../middlewares/auth")


const { createCategory , getAllCategories, categoryPageDetails } = require("../controllers/Category");


const { createCourse , editCourse, getAllCourses, getInstructorCourses } = require("../controllers/Course");
const { getFullCourseDetails, deleteCourse } = require("../controllers/Course");


const { createSection, updateSection, deleteSection } = require("../controllers/Section");


const { createSubSection, updateSubSection, deleteSubSection} =  require("../controllers/SubSection");


const { createRating, getAverageRating, getAllRating} = require("../controllers/RatingAndReview");





// contollers ---> Category.js
router.post("/createCategory", auth , isAdmin, createCategory);         
router.get("/getAllCategories", getAllCategories);                 
router.get("/categoryPageDetails", categoryPageDetails);                           // xxx Testing Left        



// controllers ---> Course.js
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse);                     // newly added  xxx Testing Left    
router.get("/getAllCourses", getAllCourses);
router.post("/getFullCourseDetails",auth, getFullCourseDetails);
router.delete("/deleteCourse", deleteCourse);                                     // newly added
router.get("/getInstructorCourses",auth, isInstructor, getInstructorCourses);     // newly added



// controllers ---> Section.js
router.post("/createSection", auth, isInstructor, createSection);                       
router.post("/updateSection", auth, isInstructor, updateSection);             
router.delete("/deleteSection", auth, isInstructor, deleteSection);  



// controllers ---> subSection.js
router.post("/createSubSection", auth, isInstructor, createSubSection);                    
router.post("/updateSubSection", auth, isInstructor, updateSubSection);                     
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);           


// contollers ---> RatingAndReview.js
router.post("/createRating", auth, isStudent, createRating);                        // xxx Testing Left          
router.get("/getAverageRating", getAverageRating);                                  // xxx Testing Left          
router.get("/getReviews", getAllRating);                                            // xxx Testing Left          




module.exports = router;