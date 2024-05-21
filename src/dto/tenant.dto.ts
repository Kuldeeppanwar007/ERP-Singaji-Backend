import { Types } from 'mongoose';

export interface ITenant {
  _id?: Types.ObjectId;  
  tenantName: string;
  host: string;
  port: number;
  userName: string;
  password: {
    hash: string;
    salt: string;
  };
  limit: number;
}
