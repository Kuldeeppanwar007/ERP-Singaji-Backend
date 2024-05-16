import { Country } from "@models/v1/index";
import { country } from "@dto/country.dto";
import { logger } from "@utils/logger.util";

export const addCountry = async (countryData: country) => {
  try {
    const country = await Country.create(countryData);

    return country;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

// Country Exist or not
export const getCountry = async (countryName: string) => {
  try {
    const country = await Country.findOne({ countryName });

    if (country) {
      return country;
    } else {
      return false;
    }
  } catch (err) {
    logger.error(err);
    return false;
  }
};
// Country Exist or not
export const countryExist = async (countryData: country) => {
  try {
    const country = await Country.findOne(countryData);

    if (country) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    logger.error(err);
    return false;
  }
};
