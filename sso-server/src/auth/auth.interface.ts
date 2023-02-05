export enum PROVIDER {
  GOOGLE = 'GOOGLE',
}

export interface GoogleUser {
  provider: PROVIDER.GOOGLE;
  providerId: string;
  email: string;
  name: string;
}
