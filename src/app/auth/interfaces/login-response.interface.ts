import { User } from "../../dashboard/interfaces/users";

export interface LoginResponse {
  user:  User;
  token: string;
}
