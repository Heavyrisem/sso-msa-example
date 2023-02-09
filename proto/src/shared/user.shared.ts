import { User } from "../proto.type";

export interface UserSSO extends Omit<User, "email" | "deletedAt"> {
  email: User["email"] | null;
  deletedAt: User["deletedAt"] | null;
}
