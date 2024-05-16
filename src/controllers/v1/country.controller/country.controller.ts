import { Request, Response, NextFunction } from "express";
import { addCountry, countryExist } from "@service/v1/index";
import { Country } from "@models/v1/index";
import responseMessages from "@config/responseMessages.config";

export const countryController = {
  
    addCountry: async(req: Request, res: Response)=>{
        try{

            const countryData = req.body
    
            if(await countryExist(countryData)){
              
                return res.status(404).json({
    
                    hasError: false,
                    message: "Country Exist"
                })
            }
    
            const country =  await addCountry(countryData)
    
         return res.status(201).send({
            hasError: false,
            country
         })
    
        } catch(err){
            return res.status(400).json({
                hasError: true,
                messgae: "Somethig went wrong"
            })
        }
    },
    getCountries: async(req: Request, res: Response)=>{

        try{
            const country = await Country.find()

            if(country){
                return res.status(200).json({
                    hasError: false,
                    count: country.length,
                    country
                })
            }
            return res.status(404).json({
            hasError: true,
            message:  "Data Not Found"
            })
        }catch(err){
            return res.status(500).send({
                hasError: false,
                message: "Something went wrong"
            })
    }

    }
}