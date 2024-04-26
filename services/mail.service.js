// mailService.js
const {emailTransportor} = require("../utils/emailTransporter")
require("dotenv").config();

// Function to send email
async function sendMail(to, subject, text) {
  try {
    // Send mail with defined transport object
    await emailTransportor.sendMail({
      from: process.env.EMAIL_ID,
      to: to,
      subject: subject,
      html: text
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
// sendMail(process.env.RECEIPT_EMAIL_ID,"Test Mail", "test");

module.exports = { sendMail };
