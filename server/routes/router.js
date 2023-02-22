const express = require("express");
const route = express.Router();
const userRoute = require("../controller/user/user")
const { verifyToken, verifyReqToken } = require("../controller/jwt/jwt");
const domain = require("../controller/domain/domain");
const { forgetPasswordVerification } = require("../controller/email/email");
// const storeData = require("../controller/storeData")
// const homeRoute = require('./homeRoute')
// const emailOtp = require('../controller/emailOtpController');

// const fetchData = require("../controller/fetchData");

// route.get("/", );
route.get("/", (req, res)=>{
    res.status(203).send({success:true, msg:"API is Working", data:"", error:""})
});

route.post("/api/register", userRoute.register);
route.post("/api/login", userRoute.login);
route.post("/api/forget-password", userRoute.forgetPassword);
route.get("/api/logout",verifyToken, userRoute.logout);
route.post("/api/verify-link", userRoute.verifyRegistrationLink);
route.get("/api/forget-password-verify-link", userRoute.forgetPasswordLinkVerification);
route.get("/api/resend-email-verification", verifyToken, userRoute.resendVerificationLink)
route.post("/api/update-profile", verifyToken, userRoute.updateProfile);
route.get("/api/forget-password-initiate", forgetPasswordVerification)

route.post("/api/save-domain-data", verifyToken,domain.saveDomainData);

route.get("/api/verify-jwt", verifyReqToken);

// route.post("/registerEmailVerify", emailOtp.registerEmailVerification);
// route.post("/forgetPasswordVerify", emailOtp.forgetPasswordVerification);
// route.get("/otpVerify", emailOtp.otpVerify);
// route.get("/tokenVerify", verifyToken);

route.get("/api/get-user-data",verifyToken, userRoute.getUserData);
// route.get("/getDomainData", fetchData.getDomainData);

// route.get("/deleteDomainData", storeData.deleteDomainData);
// route.get("/fetchDomainData", storeData.fetchDomainData);

route.use((req, res, next) => {
    res.status(401).send({ success: false, msg: "Route not found", data: {}, errors: '' });
});

module.exports = route;