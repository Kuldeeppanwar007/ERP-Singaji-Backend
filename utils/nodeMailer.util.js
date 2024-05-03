// Import Packeges
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Import Utilities
import logger from './logger.util.js';

// Load environment variables
dotenv.config();

// Configure the transporter with environment variables
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Configure the email options
// const emailOptions = {
//   from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`, // Sender address
//   to: null, // List of receivers
//   subject: null, // Subject line
//   text: null, // Plain text body
//   html:null
// };

// Example function to send an email
const sendMail = async (emailOptions) => {
  try {
    await transporter.sendMail(emailOptions);
    logger.info(`Email successfully sent to ${emailOptions.to}`);
    return true;
  } catch (error) {
    logger.error(`Error sending email: ${error}`);
    return false;
  }
};

export default { sendMail };