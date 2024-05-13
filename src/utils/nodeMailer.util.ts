import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// import logger from './logger.util.js';

// Import Utilities
import {logger} from './logger.util';

// Load environment variables
dotenv.config();

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// const emailOptions = {
//   from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`, // Sender address
//   to: null, // List of receivers
//   subject: null, // Subject line
//   text: null, // Plain text body
//   html: null
// };

// Example function to send an email
export const sendMail = async (emailOptions:any) => {
  try {
    await transporter.sendMail(emailOptions);
    console.log(`Email successfully sent to ${emailOptions.to}`);
    return true;
  } catch (error) {
     logger.error(`Error sending email: ${error}`);
    return false;
  }
};

