const nodemailer = require("nodemailer");

require("dotenv").config();

const emailTransportor = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: process.env.SMTP_EMAIL_ID,
        pass: process.env.SMTP_EMAIL_PASSWORD,
    },
});


module.exports={emailTransportor}
