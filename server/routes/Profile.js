const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");



const { updateProfile , deleteAccount, getAllUserDetails} = require("../controllers/Profile");

const { getEnrolledCourses } = require("../controllers/Profile");
const { updateDisplayPicture } = require("../controllers/Profile");




// controllers ---> Profile.js
router.put("/updateProfile", auth, updateProfile);              
router.delete("/deleteAccount", auth, deleteAccount);                 // xxx Testing Left     
router.get("/getAllUserDetails", auth, getAllUserDetails);         


// getEnrolledCourses ---> RECENTLY ADDEED                                                
router.get("/getEnrolledCourses", auth, getEnrolledCourses);


// updateDisplayPicture --->  RECENTLY ADDEED
router.put("/updateDisplayPicture", auth, updateDisplayPicture);


module.exports = router;