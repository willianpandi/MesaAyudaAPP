import { User } from "../../dashboard/interfaces/users";

export interface CheckTokenResponse {
  user:  User;
  token: string;
}
