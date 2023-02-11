import { OAuthProfile as BaseOAuthProfile } from "../proto.type";

export interface OAuthProfile
  extends Omit<BaseOAuthProfile, "email" | "profileImage"> {
  email: BaseOAuthProfile["email"] | null;
  profileImage: BaseOAuthProfile["profileImage"] | null;
}
