// Import the Address model
import { Address } from "@models/v1/index";
import { IAddress } from "@dto/address.dto";
import { logger } from "@utils/index";
import { createCountry, getCountry } from "@service/v1/index";
import { ICountry } from "@dto/country.dto";

// Define a function for creating an address
export const createAddress = async (addressData: IAddress) => {
  try {
    const country = <ICountry>addressData.country;
    // Check if country exists
    let Country = await getCountry(country);
    if (!Country) {
      Country = await createCountry(country);
    }
    addressData.country = country._id;

    // Create a new address instance
    const newAddress = new Address(addressData);

    // Save the address to the database
    const savedAddress = await newAddress.save();

    logger.info("Address Created Successfully!");

    // Return the saved address
    return savedAddress;
  } catch (error) {
    logger.error("Error creating address:");
    return false;
  }
};

// Define a function for getting an address by ID
export const getAddressById = async (addressId: string) => {
  try {
    logger.info(`Getting address with ID: ${addressId}`);

    // Get address by ID
    const address = await Address.findById(addressId);

    // If no address found, return false
    if (!address) {
      logger.warn(`Address with ID ${addressId} not found`);
      return false;
    }

    // Return the found address
    logger.info("Successfully retrieved address");
    return address;
  } catch (error) {
    logger.error("Error getting address by ID:");
    return false;
  }
};

// Define a function for getting all addresses
export const getAllAddresses = async () => {
  try {
    // Get all addresses
    const addresses = await Address.find();

    // If no addresses found, return false
    if (!addresses || addresses.length === 0) {
      logger.info("No addresses found");
      return false;
    }

    // Return all addresses
    logger.info("Successfully retrieved all addresses");
    return addresses;
  } catch (error) {
    logger.error("Error getting all addresses:");
    return false;
  }
};

// Define a function for updating an address by ID
export const updateAddressById = async (
  addressId: string,
  updatedData: IAddress
) => {
  try {
    // Update address
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      updatedData,
      { new: true }
    );

    // If no address found, return false
    if (!updatedAddress) {
      logger.warn(`Address with ID ${addressId} not found`);
      return false;
    }

    // Return the updated address
    logger.info("Successfully updated address");
    return updatedAddress;
  } catch (error) {
    logger.error("Error updating address:");
    return false;
  }
};

// Define a function for deleting an address by ID
export const deleteAddressById = async (addressId: string) => {
  try {
    // Delete address
    await Address.findByIdAndDelete(addressId);

    // Return success message
    logger.info(`Successfully deleted address with ID ${addressId}`);
    return { message: "Address deleted successfully" };
  } catch (error) {
    logger.error("Error deleting address:");
    return false;
  }
};
