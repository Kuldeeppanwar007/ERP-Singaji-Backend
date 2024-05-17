import * as admin from "firebase-admin";
import { logger } from "@utils/logger.util";
import Admin from "@config/firebase.config";

Admin.initializeApp;

export const signupUser = async (email: string, password: string) => {
  try {
    // Create a new user
    const user = await admin.auth().createUser({
      email,
      password,
    });
    // Return the new user
    logger.info(user);
    return user;
  } catch (error) {
    logger.error(error);
    return false;
  }
};
// registerUser("rajputnik911@gmail.com", "123456");

// reset password
// export const resetPassword = async (email: string) => {
//   try {
//     const actionCodeSettings = {
//       url: "http://localhost:3000/reset-password",
//       handleCodeInApp: true,
//     };

//     const link = await admin
//       .auth()
//       .generatePasswordResetLink(email, actionCodeSettings);
//     console.log(link);

//     return link;
//   } catch (error) {
//     logger.error(error);
//     return false;
//   }
// };

// resetPassword("rajputnik911@gmail.com");
// // login user with
// export const loginUser = async (email: string, password: string) => {
//   try {
//     const user = await admin.auth().signInWithEmailAndPassword(email, password);
//     return user;
//   } catch (error) {
//     logger.error(error);
//     return false;
//   }
// };

// loginUser("rajputnik911@gmail.com", "123456");

// export const SignInWithEmailLink = async (email: string, url: string) => {
//   try {
//     const user = await admin.auth().generateSignInWithEmailLink(email, { url });
//     console.log(user);

//     return user;
//   } catch (error) {
//     logger.error(error);
//     return false;
//   }
// };
// SignInWithEmailLink(
//   "rajputnik911@gmail.com",
//   "htpp://localhost:500/api/v1/user/login"
// );
