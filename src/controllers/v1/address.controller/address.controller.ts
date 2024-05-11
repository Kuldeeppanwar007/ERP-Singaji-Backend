import { responseMessages } from '@config/index';
import { logger } from '@utils/index';
import {addressService} from '@service/v1/address.service/address.service';
import { Request, Response } from 'express';

export const addressController = {
    // Create Address
    createAddress: async (req: Request, res: Response) => {
        try {
            const addressData = req.body;
            const address = await addressService.createAddress(addressData);
            logger.info("Address Created Successfully!");
            return res.status(201).json({
                hasError: false,
                data: address,
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    },

    // Get Address by ID
    getAddressById: async (req: Request, res: Response) => {
        try {
            const addressId = req.params.id;
            const address = await addressService.getAddressById(addressId);
            if (!address) {
                return res.status(404).json({
                    hasError: true,
                    message: responseMessages.ADDRESS_NOT_FOUND,
                });
            }
            logger.info('Address Retrieved Successfully');
            return res.status(200).json({
                hasError: false,
                data: address,
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    },

    // Get All Addresses
    getAllAddresses: async (req: Request, res: Response) => {
        try {
            const allAddresses = await addressService.getAllAddresses();
            if (!allAddresses || allAddresses.length === 0) {
                return res.status(404).json({
                    hasError: true,
                    message: responseMessages.ADDRESS_NOT_FOUND,
                });
            }
            logger.info('All Addresses Retrieved Successfully');
            return res.status(200).json({
                hasError: false,
                data: allAddresses,
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    },

    // Update Address
    updateAddress: async (req: Request, res: Response) => {
        try {
            const addressId = req.params.id;
            const updatedData = req.body;
            const updatedAddress = await addressService.updateAddress(addressId, updatedData);
            logger.info('Address updated successfully');
            return res.status(200).json({
                hasError: false,
                message: responseMessages.ADDRESS_UPDATED,
                data: updatedAddress,
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    },

    // Delete Address
    deleteAddress: async (req: Request, res: Response) => {
        try {
            const addressId = req.params.id;
            await addressService.deleteAddress(addressId);
            logger.info('Address deleted successfully');
            return res.status(200).json({
                hasError: false,
                message: responseMessages.ADDRESS_DELETED,
            });
        } catch (err) {
            logger.error(err);
            return res.status(500).json({
                hasError: true,
                message: responseMessages.INTERNAL_SERVER_ERROR,
            });
        }
    },
};