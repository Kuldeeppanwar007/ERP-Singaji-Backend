import { Tenant } from "@models/v1/index";
import { ITenant } from "@dto/tenant.dto";
import { logger, generateHash } from "@utils/index";

async function createTenant(tenantData: any) {
  try {
    // Check if a tenant with the same name or username already exists
    const existingTenant = await Tenant.findOne({
      $or: [
        { tenantName: tenantData.tenantName },
        { userName: tenantData.userName },
      ],
    });
    if (existingTenant) {
      logger.error("Tenant name or username already exists.");
    }

    // Hash the password
    tenantData.password = generateHash(tenantData.password);

    const tenant = new Tenant(tenantData);
    const savedTenant = await tenant.save();
    logger.info(`New tenant created: ${savedTenant.tenantName}`);
    return savedTenant;
  } catch (error: any) {
    logger.error("Error creating tenant:", error);
  }
}

async function getAllTenants() {
  try {
    const allTenants = await Tenant.find();
    return allTenants;
  } catch (error) {
    logger.error("Error getting all tenants:", error);
  }
}

async function getTenantById(tenantId: string) {
  try {
    const tenantData = await Tenant.findById(tenantId);
    if (!tenantData) {
      logger.error(`Tenant not found with ID: ${tenantId}`);
    }
    return tenantData;
  } catch (error) {
    logger.error(`Error getting tenant by ID ${tenantId}:`, error);
  }
}

async function updateTenantById(tenantId: string, updateData: any) {
  try {
    // Hash the password if provided in the updateData
    if (updateData.password) {
      updateData.password = generateHash(updateData.password);
    }

    const updatedTenant = await Tenant.findByIdAndUpdate(tenantId, updateData, {
      new: true,
    });

    if (!updatedTenant) {
      logger.error(`Tenant not found with ID: ${tenantId}`);
    }

    logger.info(`Tenant updated successfully`);
    return updatedTenant;
  } catch (error: any) {
    logger.error("Error updating tenant:", error);
  }
}

async function deleteTenantById(tenantId: string) {
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(tenantId);
    if (!deletedTenant) {
      logger.error(`Tenant not found with ID: ${tenantId}`);
    }
    logger.info(`Tenant deleted successfully`);
    return deletedTenant;
  } catch (error) {
    logger.error(`Error deleting tenant with ID ${tenantId}:`, error);
  }
}

async function checkTenantExists(tenantName: string) {
  try {
    const existingTenant = await Tenant.findOne({ tenantName });
    return !!existingTenant; // Convert result to boolean
  } catch (error) {
    logger.error("Error checking tenant existence:", error);
  }
}

export {
  createTenant,
  getTenantById,
  getAllTenants,
  updateTenantById,
  deleteTenantById,
  checkTenantExists,
};
