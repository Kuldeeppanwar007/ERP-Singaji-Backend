import { countryController } from "@controllers/v1/country.controller/country.controller";
import express from "express";

const router = express.Router()

// ROUTES: Add country
router.post("/add", countryController.addCountry)

// ROUTES: Get country
router.get("/getall", countryController.getCountries)

export {router as countryRoutes}