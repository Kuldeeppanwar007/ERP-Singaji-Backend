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

    // Return the saved organization
    return savedOrganization;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

// SERVICE: Get all the organizations
export const getOrganizations = async () => {
  try {
    // Geting All Organizations
    const allOrganizations = await Organization.find({});

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
export const getOrganizationById = async (_id: string) => {
  try {
    // Geting Organization By ID
    logger.info("Entered In GetORG By Id " + _id);
    const organizationData = await Organization.findById(_id);

    // If No Organization then return false
    if (!organizationData) return false;
    // Return organization
    logger.info("Successfully Get Organization");
    return organizationData;
  } catch (error) {
    logger.error(new Error("ID Mismatch"));
    return false;
  }
};
// Define a function for update organization by ID
export const updateOrganizationById = async (_id: string, payload: object) => {
  try {
    // Update Organization
    const updatedOrganization = await Organization.findByIdAndUpdate(
      { _id },
      payload,
      { new: true }
    );

    // If No organization then return false
    if (!updatedOrganization) return false;
    // Return updated organizations
    logger.info("Successfully Updated Organizations");
    return updatedOrganization;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

// Define a function for checking if an email exists
export const checkOrgEmailExists = async (email: string) => {
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
