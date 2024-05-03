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

<<<<<<< HEAD:services/nodemailer.js
// // Configure the email options
// const emailOptions = {
//   from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`, // Sender address
//   to: 'rajputnik911@gmail.com', // List of receivers
//   subject: 'Welcome Message', // Subject line
//   text: 'Thanks for joining our ssism community', // Plain text body
//   // html: '<p>Hello world in ssism</p>', // HTML body content
// };
=======
// Configure the email options
const emailOptions = {
  from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`, // Sender address
  to: null, // List of receivers
  subject: null, // Subject line
  text: null, // Plain text body
};
>>>>>>> c3be6171e1fbc0bfd049f68216e5895707d69d3b:utils/nodeMailer.util.js

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

<<<<<<< HEAD:services/nodemailer.js
// Call the sendMail function with the email options
// sendMail(emailOptions);

export default sendMail;
=======
export default { sendMail };
>>>>>>> c3be6171e1fbc0bfd049f68216e5895707d69d3b:utils/nodeMailer.util.js
