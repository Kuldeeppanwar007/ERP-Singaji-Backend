import {Address} from '@models/v1/index';

export const addressService = {
    // Create Address
    createAddress: async (addressData:any) => {
        try {
            const address = new Address(addressData);
            await address.save();
            return address;
        } catch (error) {
            throw new Error("Error creating address: " + error);
        }
    },

    // Get Address by ID
    getAddressById: async (addressId:any) => {
        try {
            const address = await Address.findById(addressId);
            return address;
        } catch (error) {
            throw new Error("Error getting address by ID: " + error);
        }
    },

    // Get All Addresses
    getAllAddresses: async () => {
        try {
            const addresses = await Address.find();
            return addresses;
        } catch (error) {
            throw new Error("Error getting all addresses: " + error);
        }
    },

    // Update Address
    updateAddress: async (addressId:any, updatedData:any) => {
        try {
            const address = await Address.findByIdAndUpdate(addressId, updatedData, { new: true });
            return address;
        } catch (error) {
            throw new Error("Error updating address: " + error);
        }
    },

    // Delete Address
    deleteAddress: async (addressId:any) => {
        try {
            await Address.findByIdAndDelete(addressId);
            return { message: "Address deleted successfully" };
        } catch (error) {
            throw new Error("Error deleting address: " + error);
        }
    }
};
