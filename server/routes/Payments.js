const express = require("express");
const router = express.Router();

const {capturePayment, verifySignature} = require("../controllers/Payments");

const {auth, isInstructor, isStudent , isAdmin} = require("../middlewares/auth");

// controllers ---> Payments.js
router.post("/capturePayment", auth, isStudent, capturePayment);                // xxx Testing left
router.post("/verifySignature", verifySignature);                               // xxx Testing left




module.exports = router;