import { tenantDto } from "@dto/tenant.dto";
import { Tenant } from "@models/v1/index";
import { generateHash } from "@utils/index";
import { logger } from "@utils/logger.util";

// Create a new tenant
export const createTenant = async (tenantData: tenantDto) => {
  try {
    // password hashing
    tenantData.password = generateHash(tenantData.password);

    // Create new Tenant
    let newTenant = new Tenant(tenantData);
    newTenant = await newTenant.save();

    if (newTenant) {
      logger.info("Tenant successfully created");
    }
    return newTenant;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

// Get all tenants
export const getTenants = async () => {
  try {
    const tenants = await Tenant.find();
    
    if (tenants) {
      logger.info("Get Tenants Successfully");
    }
    return tenants;
  } catch (error) {
    return false;
  }
};

// Get tenant by ID
export const getTenantById = async (tenantId: string) => {
  try {
    const tenant = await Tenant.findById(tenantId);
    if (tenant) {
      logger.info("Get Tenant Successfully");
    }
    return tenant;
  } catch (error) {
    return false;
  }
};

// Update tenant by ID
export const updateTenantById = async (tenantId: string, updateData: any) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(tenantId, updateData, {
      new: true,
    });
    if (updatedTenant) {
      logger.info("Get Tenant Successfully");
    }
    return updatedTenant;
  } catch (error) {
    return false;
  }
};

// Check tenant exists dynamically
export const checkTenantExists = async (key: string, value: string) => {
  try {
    const query = { [key]: value };
    const tenant = await Tenant.findOne(query);
    return !!tenant; // This will return true if tenant exists, otherwise false
  } catch (error) {
    return false;
  }
};
