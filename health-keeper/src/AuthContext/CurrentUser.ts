export type CurrentUser = {
  accessToken: string;
  auth: object;
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: object;
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: object[];
  providerId: string;
  reloadListener: null;
  reloadUserInfo: object;
  stsTokenManager: object;
  tenantId: string | null;
  uid: string;
};
