// Import the organization model
import { Organization, User } from "@models/v1/index";
import { organization } from "dto/organization.dto";
import { signupUser } from "middlewares/userAuth.middleware";
import { registerUser } from "@service/v1/index";
// Import Utilities
import { logger, sendMail } from "@utils/index";

// Define a function for creating an organization
export const registerOrganization = async (organizationData: organization) => {
  try {
    // Create a new organization instance
    const newOrganization = new Organization(organizationData);

    // Save the organization to the database
    const savedOrganization = await newOrganization.save();

    // send the organization request email
    sendMail({
      from: `<${newOrganization.organizationEmail}>`,
      to: process.env.SUPERADMIN_EMAIL,
      subject: "New Organization Request",
      html: `
    <div style="background-color: #f8f9fa; padding: 30px;">
      <h2 style="color: #6c757d;">New Organization Request</h2>
      <hr />
      <p style="font-size: 18px; color: #6c757d;">
        A new organization named <strong>${newOrganization.organizationName}</strong> has requested to join.
      </p>
      <hr />
      <p style="font-size: 16px; color: #6c757d;">
        Please review the request and take the necessary actions.
      </p>
    </div>
  `,
    });

    // Return the saved organization
    return savedOrganization;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

// Define a function for get all organizations
export const getAllOrganization = async () => {
  try {
    // Geting All Organizations
    const allOrganizations = await Organization.find();
    // If No Organizations then return false
    if (!allOrganizations || allOrganizations.length == 0) return false;
    // Return All organizations
    logger.info("Successfully Get All Organizations");
    return allOrganizations;
  } catch (error) {
    logger.error(error);
    return false;
  }
};
// Define a function for get organization by ID
export const getOrganizationById = async (id: string) => {
  try {
    // Geting Organization By ID
    const organization = await Organization.find({ _id: id });
    // If No Organization then return false
    if (!organization) return false;
    // Return organization
    logger.info("Successfully Get Organization");
    return organization;
  } catch (error) {
    logger.error(error);
    return false;
  }
};
// Define a function for updating an organization by ID
export const updateOrganizationById = async (id: string, payload: object) => {
  try {
    // Update Organization
    const updatedOrganization = await Organization.findByIdAndUpdate(
      id,
      payload,
      { new: true }
    );
    
    // If No organization then return false
    if (!updatedOrganization) return false;
    // Return All organizations
    logger.info("Successfully Updated Organizations");
    return updatedOrganization;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

// Define a function for checking if an email exists
export const checkIfEmailExists = async (email: string) => {
  try {
    // Find an organization with the given email address
    const newOrganization = await Organization.findOne({
      organizationEmail: email,
    });

    // If an organization was found, return true
    if (newOrganization) {
      return true;
    }

    // If no organization was found, return false
    return false;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

// register Organiation Admin
export const registerOrganizationAdmin = async (adminData: any) => {
  // register user in DB
  registerUser(adminData);

  // Extract the email and password from the adminData object
  const { email, password } = adminData as { email: string; password: string };

  // Register the new user in firebase
  await signupUser(email, password);
};

// send organization verification email
export const sendVerificationEmail = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  sendMail({
    from: `<${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Organization Verification",
    html: `
    <p><strong>Your organization has been successfully verified.</strong></p>
    <p>Please <a href="${process.env.FRONTEND_URL}/login">login to your account</a> to continue.</p>
    <p>Your Login: ${user.email}</p>
    <p>Your Passwords: ${user.password}</p>
  `,
  });
};

export const sendRejectionEmail = (userEmail: string) => {
  sendMail({
    from: `<${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Organization Rejection Notification",
    html: `
        <div style="background-color: #f8f9fa; padding: 30px;">
          <h2 style="color: #6c757d;">Organization Rejection Notification</h2>
          <hr />
          <p style="font-size: 18px; color: #6c757d;">
            We regret to inform you that your organization has not been approved.
          </p>
          <hr />
          <p style="font-size: 16px; color: #6c757d;">
            If you believe this is a mistake or if you have any questions, please contact our support team.
          </p>
        </div>
      `,
  });
};
