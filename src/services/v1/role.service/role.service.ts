import { getTenantDbConnection } from "@utils/database.util";

export async function createRole(organizationId: string, roleData: any) {
  const tenantDbConnection = await getTenantDbConnection(organizationId);
  if (!tenantDbConnection) {
    throw new Error("Failed to establish database connection");
  }
  const Role = tenantDbConnection.model("Role");
  const newRole = new Role(roleData);
  return newRole.save();
}

export async function getRoles(organizationId: string) {
  const tenantDbConnection: any = await getTenantDbConnection(organizationId);
  if (!tenantDbConnection) {
    throw new Error("Failed to establish database connection");
  }
  const Role = tenantDbConnection.model("Role");
  return Role.find();
}
