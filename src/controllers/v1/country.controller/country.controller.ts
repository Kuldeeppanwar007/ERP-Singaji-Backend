import { Request, Response } from "express";
import { createCountry, getCountry } from "@service/v1/index";
import { RESPONSE_MESSAGES } from "@config/index";
import { ApiError, ApiResponse, asyncHandler } from "@utils/index";
import { Country } from "@models/v1/index";

export const countryController = {
  // create new country
  addCountry: asyncHandler(async (req: Request, res: Response) => {
    const { countryName } = req.body;
    // Check if country already exists
    if (await getCountry(countryName)) {
      return res
        .status(409)
        .json(new ApiError(409, RESPONSE_MESSAGES.COUNTRY.ERROR.COUNTRY_EXIST));
    }

    const newCountry = await createCountry(countryName);
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          RESPONSE_MESSAGES.COUNTRY.SUCCESS.CREATE,
          newCountry
        )
      );
  }),

  // get all countries
  getCountries: asyncHandler(async (req: Request, res: Response) => {
    const countries = await Country.find();

    if (countries.length === 0) {
      return res
        .status(404)
        .json(new ApiError(404, RESPONSE_MESSAGES.COUNTRY.ERROR.NOT_FOUND));
    }

    return res.json(
      new ApiResponse(200, RESPONSE_MESSAGES.COUNTRY.SUCCESS.FOUND, {
        count: countries.length,
        countries,
      })
    );
  }),
};
