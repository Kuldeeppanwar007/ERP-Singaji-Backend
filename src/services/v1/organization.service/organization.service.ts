// Import the organization model
import { Organization } from "@models/v1/index";
import { organization } from "dto/organization.dto";

// Import Utilities
import { logger } from "@utils/index";

// SERVICE: Register Organization
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

// SERVICE: Verify Organization
export const verifyOrganization = async(id: any, data: any)=>{
  try{

    const organization = await Organization.findByIdAndUpdate(id, data)

    if(organization){
      return organization
    }
    return false
  }catch(error){
    return false

  }
}
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
// Define a function for update organization by ID
export const updateOrganizationById = async (id: string, payload: object) => {
  try {
    // Update Organization
    const updatedOrganization = await Organization.findByIdAndUpdate(
      id,
      payload
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
