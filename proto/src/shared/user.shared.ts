import { User } from "../proto.type";

export interface UserSSO
  extends Omit<User, "email" | "profileImage" | "deletedAt"> {
  email: User["email"] | null;
  profileImage: User["profileImage"] | null;
  deletedAt: User["deletedAt"] | null;
}
