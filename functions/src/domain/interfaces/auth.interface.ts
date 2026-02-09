export interface UserTokenResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}