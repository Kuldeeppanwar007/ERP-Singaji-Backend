import { Tenant } from "@models/v1/index";

// Create a new tenant
const createTenant = async (tenantData: any) => {
  try {
    const newTenant = new Tenant(tenantData);
    const savedTenant = await newTenant.save();
    return savedTenant;
  } catch (error) {
    return false;
  }
};

// Get all tenants
const getAllTenants = async () => {
  try {
    const tenants = await Tenant.find();
    return tenants;
  } catch (error) {
    return false;
  }
};

// Get tenant by ID
const getTenantById = async (tenantId: string) => {
  try {
    const tenant = await Tenant.findById(tenantId);
    return tenant;
  } catch (error) {
    return false;
  }
};

// Update tenant by ID
const updateTenantById = async (tenantId: string, updateData: any) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(tenantId, updateData, {
      new: true,
    });
    return updatedTenant;
  } catch (error) {
    return false;
  }
};

// Delete tenant by ID
const deleteTenantById = async (tenantId: string) => {
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(tenantId);
    return deletedTenant;
  } catch (error) {
    return false;
  }
};

export default {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenantById,
  deleteTenantById,
};
