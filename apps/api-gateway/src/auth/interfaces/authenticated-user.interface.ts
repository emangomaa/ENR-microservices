import { UserRole } from "libs/common";
export interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
}