import { Country } from "@models/v1/index";
import { country } from "@dto/country.dto";

export const addCountry = async(countryData: country)=>{

    try{

        const country = await Country.create(countryData)

        return country
    }catch(err){

    }
    
}

// Country Exist or not
export const countryExist = async(countryData: country)=>{
    try{

        const country = await Country.findOne(countryData)

        if(country){
            return true
        }else{
            return false
        }

    }catch(err){

    }
}