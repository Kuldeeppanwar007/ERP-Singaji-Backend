import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

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

// // Configure the email options
// const emailOptions = {
//   from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`, // Sender address
//   to: 'rajputnik911@gmail.com', // List of receivers
//   subject: 'Welcome Message', // Subject line
//   text: 'Thanks for joining our ssism community', // Plain text body
//   // html: '<p>Hello world in ssism</p>', // HTML body content
// };

// Example function to send an email
const sendMail = async (emailOptions) => {
  try {
    let info = await transporter.sendMail(emailOptions);
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email: ', error);
    return false;
  }
};

// Call the sendMail function with the email options
// sendMail(emailOptions);

export default sendMail;