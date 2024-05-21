import { Request, Response } from "express";
import { RESPONSE_MESSAGES } from "@config/responseMessages.config";
import { ApiError, ApiResponse, asyncHandler } from "@utils/index";
import { Country } from "@models/v1/index";
import {
  createAddress,
  getAddressById,
  getAllAddresses,
  updateAddressById,
  deleteAddressById,
} from "@service/v1/index";

export const addressController = {
  // CREATE ADDRESS
  createAddress: asyncHandler(async (req: Request, res: Response) => {
    const addressData = req.body;
    const newAddress = await createAddress(addressData);
    if (!newAddress) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.ADDRESS.ERROR.NOT_FOUND));
    }
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          RESPONSE_MESSAGES.ADDRESS.SUCCESS.CREATE,
          newAddress
        )
      );
  }),

  // GET ADDRESS BY ID
  getAddressById: asyncHandler(async (req: Request, res: Response) => {
    const addressId = req.params.addressId;
    const address = await getAddressById(addressId);
    if (!address) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.ADDRESS.ERROR.NOT_FOUND));
    }
    return res.json(
      new ApiResponse(200, RESPONSE_MESSAGES.ADDRESS.SUCCESS.FOUND, address)
    );
  }),

  // GET ALL ADDRESSES
  getAllAddresses: asyncHandler(async (req: Request, res: Response) => {
    const addresses = await getAllAddresses();
    if (!addresses) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.ADDRESS.ERROR.NOT_FOUND));
    }
    return res.json(
      new ApiResponse(200, RESPONSE_MESSAGES.ADDRESS.SUCCESS.FOUND, addresses)
    );
  }),

  // UPDATE ADDRESS BY ID
  updateAddressById: asyncHandler(async (req: Request, res: Response) => {
    const addressId = req.params.addressId;
    const updatedData = req.body;

    // Check if country exists (if updating the country)
    if (updatedData.country) {
      const country = await Country.findById(updatedData.country);
      if (!country) {
        return res
          .status(404)
          .json(new ApiError(404, RESPONSE_MESSAGES.COUNTRY.ERROR.NOT_FOUND));
      }
    }

    const updatedAddress = await updateAddressById(addressId, updatedData);
    if (!updatedAddress) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.ADDRESS.ERROR.NOT_FOUND));
    }
    return res.json(
      new ApiResponse(
        200,
        RESPONSE_MESSAGES.ADDRESS.SUCCESS.UPDATE,
        updatedAddress
      )
    );
  }),

  // DELETE ADDRESS BY ID
  deleteAddressById: asyncHandler(async (req: Request, res: Response) => {
    const addressId = req.params.addressId;
    const result = await deleteAddressById(addressId);
    if (!result) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.ADDRESS.ERROR.NOT_FOUND));
    }
    return res.json(
      new ApiResponse(200, RESPONSE_MESSAGES.ADDRESS.SUCCESS.DELETE)
    );
  }),
};
