import OrganizationModel from "../../../models/v1/organization.model/organization.model.js";
import dotenv from "dotenv";
dotenv.config();

dotenv.config();

interface OrganizationData {
    name: string;
    type: string;
    email: string;
    address: string;
    website: string;
    phone: string;
    affiliations: string[];
    registrationInfo: string;
    vision: string;
    socialMediaProfiles: string[];
    logo: string;
}

const registerOrganization = async (organizationData: OrganizationData) => {
    try {
        // Get the first character of each word in the organization's name
        const words = organizationData.name.split(" ");
        let acronym = "";
        for (let i = 0; i < words.length; i++) {
            acronym += words[i].charAt(0);
        }
        // create organization database
        const organizationURL = `${process.env.MONGODB_URL}_${acronym}`

        // Create a new organization object
        const newOrganization = new OrganizationModel({
            name: organizationData.name,
            type: organizationData.type,
            email: organizationData.email,
            address: organizationData.address,
            website: organizationData.website,
            phone: organizationData.phone,
            affiliations: organizationData.affiliations,
            registrationInfo: organizationData.registrationInfo,
            vision: organizationData.vision,
            socialMediaProfiles: organizationData.socialMediaProfiles,
            logo: organizationData.logo,
            dbURL: organizationURL,
        });

        // Save the organization to the database
        await newOrganization.save();
        console.log('Organization registered successfully!');
        return newOrganization;
    } catch (error) {
        console.error('Error registering organization:', error);
    }
};

export default { registerOrganization }