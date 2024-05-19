export interface tenantDto {
  host: string;
  userName: string;
  password: { salt?: string; hash?: string };
  port: string;
}
