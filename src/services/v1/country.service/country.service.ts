import { Country } from "@models/v1/index";
import { ICountry } from "@dto/country.dto";
import { logger } from "@utils/logger.util";

// creat new Country
export const createCountry = async (countryData: ICountry) => {
  try {
    const country = await Country.create(countryData);
    logger.info("Country Created Successfully");
    return country.save();
  } catch (err) {
    logger.error(err);
    return false;
  }
};

// Country Exist or not
export const getCountry = async (countryName: ICountry) => {
  try {
    logger.info(`Getting address with Name: ${countryName}`);

    const country = await Country.findOne({ countryName });

    if (country) {
      logger.info("Country Found Successfully");
      return country;
    } else {
      return false;
    }
  } catch (err) {
    logger.error(err);
    return false;
  }
};
