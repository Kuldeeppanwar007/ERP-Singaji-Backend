import mongoose from "mongoose";

export interface IOrganization {
  organizationName: string;
  adminName: string;
  organizationType: string;
  organizationEmail: string;
  organizationAddress: mongoose.Types.ObjectId;
  organizationWebsite?: string;
  organizationPhone: string;
  affiliations?: string;
  organizationRegistrationInfo: string;
  organizationVision: string;
  socialMediaProfiles: string[];
  organizationLogo: string;
  alternateNumber: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  isActive: boolean;
  planType?: "BASIC" | "ADVANCED" | "ENTERPRISE";
  tenantId: mongoose.Types.ObjectId;
}
