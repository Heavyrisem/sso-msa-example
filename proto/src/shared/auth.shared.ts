import { OAuthProfile as BaseOAuthProfile } from "../proto.type";

export interface OAuthProfile extends Omit<BaseOAuthProfile, "email"> {
  email: BaseOAuthProfile["email"] | null;
}
