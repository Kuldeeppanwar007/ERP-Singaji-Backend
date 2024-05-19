export const RESPONSE_MESSAGES = {
  USERS: {
    SUCCESS: {
      CREATE: "User created successfully.",
      UPDATE: "User updated successfully.",
      DELETE: "User deleted successfully.",
      FOUND: "User found successfully.",
      VERIFIED: "User verified successfully.",
    },
    ERROR: {
      CREATE: "Failed to create user.",
      UPDATE: "Failed to update user.",
      DELETE: "Failed to delete user.",
      NOT_FOUND: "User not found.",
      USER_EXIST: "User already exists.",
    },
  },
  ORGANIZATION: {
    SUCCESS: {
      CREATE: "Organization created successfully.",
      UPDATE: "Organization updated successfully.",
      DELETE: "Organization deleted successfully.",
      FOUND: "Organization found successfully.",
      VERIFIED: "Organization verified successfully.",
    },
    ERROR: {
      CREATE: "Failed to create organization.",
      UPDATE: "Failed to update organization.",
      DELETE: "Failed to delete organization.",
      REJECTED: "Organization rejected successfully.",
      NOT_FOUND: "Organization not found.",
      ORGANIZATION_EXIST: "Organization already exists.",
    },
  },
  ADDRESS: {
    SUCCESS: {
      CREATE: "Address created successfully.",
      UPDATE: "Address updated successfully.",
      DELETE: "Address deleted successfully.",
      FOUND: "Address found successfully.",
    },
    ERROR: {
      CREATE: "Failed to create address.",
      UPDATE: "Failed to update address.",
      DELETE: "Failed to delete address.",
      NOT_FOUND: "Address not found.",
      ADDRESS_EXIST: "Address already exists.",
    },
  },
  COUNTRY: {
    SUCCESS: {
      CREATE: "Country created successfully.",
      UPDATE: "Country updated successfully.",
      DELETE: "Country deleted successfully.",
      FOUND: "Country found successfully.",
    },
    ERROR: {
      CREATE: "Failed to create country.",
      UPDATE: "Failed to update country.",
      DELETE: "Failed to delete country.",
      NOT_FOUND: "Country not found.",
      COUNTRY_EXIST: "Country already exists.",
    },
  },
  TENANT: {
    SUCCESS: {
      CREATE: "Tenant created successfully.",
      UPDATE: "Tenant updated successfully.",
      DELETE: "Tenant deleted successfully.",
      FOUND: "Tenant found successfully.",
    },
    ERROR: {
      CREATE: "Failed to create tenant.",
      UPDATE: "Failed to update tenant.",
      DELETE: "Failed to delete tenant.",
      NOT_FOUND: "Tenant not found.",
      TENANT_EXIST: "Tenant already exists.",
    },
  },
  ROLE: {
    SUCCESS: {
      CREATE: "Role created successfully.",
      UPDATE: "Role updated successfully.",
      DELETE: "Role deleted successfully.",
      FOUND: "Role found successfully.",
    },
    ERROR: {
      CREATE: "Failed to create role.",
      UPDATE: "Failed to update role.",
      DELETE: "Failed to delete role.",
      NOT_FOUND: "Role not found.",
      ROLE_EXIST: "Role already exists.",
    },
  },

  INTERNAL_SERVER_ERROR: "Internal server error occurred.",
};
