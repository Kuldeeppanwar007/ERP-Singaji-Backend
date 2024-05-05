import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// import logger from './logger.util.js';

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

const sendMail = async (emailOptions: { to: string }) => {
  try {
    await transporter.sendMail(emailOptions);
    console.log(`Email successfully sent to ${emailOptions.to}`);
    return true;
  } catch (error) {
    console.log(`Error sending email: `);
    return false;
  }
};

export default { sendMail };