import userModel from "../../../models/v1/user.model/user.model.js";
import { findOrganization, connectOrganizationDB } from "../../../utils/db.js";

const register = async (userData: any) => {
  try {
    // Get the organization from the user data
    const organization = await findOrganization("rajputnik6348@gmail.com");

    console.log("Organization:", organization);

    // Connect to the correct database
    if (organization) {
      const connection = await connectOrganizationDB(organization.dbURL);

      // Define the model for the database
      const User = connection.model("User", userModel);

      // Create a new user
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        organizationId: organization._id,
      });
      console.log("User:", user);
      
      // Save the user to the database
      await user.save();
      console.log("User registered successfully!");
      
      return user;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return error;
  }
};

export default { register };
