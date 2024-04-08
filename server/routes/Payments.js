const express = require("express");
const router = express.Router();

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments");

const { auth, isInstructor, isStudent , isAdmin } = require("../middlewares/auth");

// controllers ---> Payments.js
router.post("/capturePayment", auth, isStudent, capturePayment);                    // xxx Testing left
router.post("/verifyPayment", auth, isStudent, verifyPayment);                    // xxx Testing left
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);  // xxx Testing left                                    // xxx Testing left



module.exports = router;