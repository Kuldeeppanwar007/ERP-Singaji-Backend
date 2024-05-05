import { userModel } from "../../../models/v1/index.js";
import { crypto, nodeMailer } from "../../../utils/index.js";

// Centralized Email Sending Function
interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({
  to,
  subject,
  text,
  html = "",
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    await nodeMailer.sendMail({
      from: `"Nikhil Rajput" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    } as EmailOptions);

    console.log(`Email sent successfully to ${to}`);
  } catch (err) {
    console.log(`Failed to send email to ${to} - ${(err as Error).message}`);
    throw err;
  }
}
// Function: Register User
async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    // Hash Password
    payload.password = crypto.generateHash(payload.password);

    // Create New User
    const user = new userModel(payload);

    // Save in Database
    await user.save();

    console.log(
      `User Registered Successfully! Email: ${payload.email} | Name: ${payload.name}`
    );

    // Send Welcome Email
    await sendEmail({
      to: user.email,
      subject: `Welcome to Our Community, ${user.name}! 🎉`,
      text: `Hi ${user.name},\n\nWelcome to our community! We're thrilled to have you on board. Get ready to explore, connect, and enjoy. If you have any questions or need assistance, feel free to reach out.\n\nCheers,\nThe Team`,
    });
    return user;
  } catch (err) {
    console.log(`Error registering user: ${(err as Error).message}`);
    throw err;
  }
}

// Function: Login User
async function getUserByEmail(email: string) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log(`User Not Found: `);
      return null;
    }
    console.log(`User Found Successfully: `);

    // send email notification to the user logged in
    await sendEmail({
      to: email,
      subject: "Welcome Back!",
      text: `Hi ${user.name},\n\nWelcome back to our community! We're thrilled to have you back. If you have any questions or need assistance, feel free to reach out.\n\nCheers,\nThe Team`,
    });

    return user;
  } catch (err) {
    console.log(`Error finding user by email : ${(err as Error).message}`);
    throw err;
  }
}

// Function: Check Email Exists
async function checkEmailExists(email: string) {
  try {
    const user = await userModel.findOne({ email });
    return user;
  } catch (err) {
    console.log(`Error checking if email exists : ${(err as Error).message}`);
    throw err;
  }
}

async function getAllUsers() {
  try {
    const users = await userModel.find();
    return users;
  } catch (err) {
    console.log(`Error retrieving all users: ${(err as Error).message}`);
    throw err;
  }
}

// UPDATE USER
async function updateUserByEmail(email: string, updateData: any) {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );
    if (!updatedUser) {
      console.log(`No user found with email: `);
      return null;
    }
    console.log(`User with email:  updated successfully`);

    // Send notification update the user in our system
    await sendEmail({
      to: email,
      subject: "User Updated",
      text: `Hi ${updatedUser.name},\n\nYour account has been updated in our system.\n\nBest,\nThe Team`,
    });

    return updatedUser;
  } catch (err) {
    console.log(
      `Error updating user with email:  - ${(err as Error).message}`
    );
    throw err;
  }
}

// DELETE USER
async function deleteUserByEmail(email: string) {
  try {
    const deletionResult = await userModel.findOneAndDelete({ email });
    if (!deletionResult) {
      console.log(`No user found with email: `);
      return false;
    }
    console.log(`User with email:  deleted successfully`);

    // send notification to the user that their account has been deleted
    await sendEmail({
      to: email,
      subject: "Account Deleted",
      text: `Hi, Your account has been deleted from our system.\n\nBest,\nThe Team`,
    });

    return true;
  } catch (err) {
    console.log(
      `Error deleting user with email:  - ${(err as Error).message}`
    );
    throw err;
  }
}

// Function: Forgot Password
async function resetPasswordByEmail(email: string) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log(`User not found: `);
      return null;
    }

    console.log(`Password reset initiated for: `);

    // Send Password Reset Email
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: `Hi ${user.name},\n\nA password reset request was initiated for your account. If this was you, please click the link below to reset your password. If you did not initiate this request, please ignore this email.\n\nReset Password Link: ${process.env.RESET_PASSWORD_URL}/${user._id}\n\nBest,\nThe Team`,
    });
    return user;
    // return user;
  } catch (err) {
    console.log(`Error resetting password: ${(err as Error).message}`);
    throw err;
  }
}

// Function: Update Password

async function updatePasswordByEmail(email: string, password: string) {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { password: crypto.generateHash(password) },
      { new: true }
    );
    if (!updatedUser) {
      console.log(`No user found with email: `);
      return null;
    }
    console.log(`User with email:  updated successfully`);

    // Send notification update the user in our system
    await sendEmail({
      to: email,
      subject: "Password Updated",
      text: `Hi ${updatedUser.name},\n\nYour password has been updated in our system.\n\nBest,\nThe Team`,
    });

    return updatedUser;
  } catch (err) {
    console.log(
      `Error updating user with email:  - ${(err as Error).message}`
    );
    throw err;
  }
}

export default {
  registerUser,
  getUserByEmail,
  checkEmailExists,
  getAllUsers,
  updateUserByEmail,
  deleteUserByEmail,
  resetPasswordByEmail,
  updatePasswordByEmail,
};
