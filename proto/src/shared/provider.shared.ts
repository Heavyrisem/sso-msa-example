import { Provider } from "../proto.type";

export type ProviderString = "google" | "github" | "kakao";

export const providerToString = (provider: Provider): ProviderString => {
  switch (provider) {
    case Provider.GOOGLE:
      return "google";
    case Provider.GITHUB:
      return "github";
    case Provider.KAKAO:
      return "kakao";
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
};

export const stringToProvider = (str: string): Provider => {
  switch (str.toLowerCase()) {
    case "google":
      return Provider.GOOGLE;
    case "github":
      return Provider.GITHUB;
    case "kakao":
      return Provider.KAKAO;
    default:
      throw new Error(`Unknown provider: ${str}`);
  }
};
