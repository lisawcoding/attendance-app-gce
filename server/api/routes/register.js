const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { signAccessToken, verifyAccessToken } = require("../../JWT");


const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const GOOGLE_USER = process.env.GOOGLE_MAIL_USER;

const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

router.post("/assignToken", (req, res) => {
     console.log("req body: ", req.body);
     const jwtToken =signAccessToken({ email: req.body.email})
     return res.json(jwtToken);
})

router.post("/mail", async (req, res) => {

     const jwtToken = signAccessToken({ email: req.body.email });
     const accessToken = await oAuth2Client.getAccessToken();
     const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
               type: "OAuth2",
               user: GOOGLE_USER,
               clientId: GOOGLE_CLIENT_ID,
               clientSecret: GOOGLE_CLIENT_SECRET,
               refreshToken: GOOGLE_REFRESH_TOKEN,
               accessToken: accessToken,
          },
     });

     const mailOptions = {
          from: `Attendance APP <${GOOGLE_USER}>`,
          to: req.body.email,
          subject: "hello from Attendance APP",
          text: `hello ${req.body.name}, please copy and past the below token: </h1><p>${jwtToken}`,
          html: `<h1>hello <span>${req.body.name}</span></h1>
        <h1>please copy and past the below token: </h1><p>${jwtToken}</p>`,
     };

     transporter.sendMail(mailOptions, function (error, user) {
          if (error) {
               res.json({error: error})
          } else {
               console.log("mail sent: ", user);
               console.log("mail jwtToken: ", jwtToken);
               res.json({ status: "success", result: user, jwtToken: jwtToken, info: "mail sent succefully" });
          }
     });
});

router.post("/auth", verifyAccessToken, (req, res) => {
     if (req.body.payload.email !== req.body.email) return res.json({ status: "err", result: "wrong email" });
     res.json({ status: "success: jwt verify", result: req.body.payload });
});

module.exports = router;