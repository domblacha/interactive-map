export interface AuthRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
  refreshTokenExpires: string;
}

export interface AuthStore {
  accessToken: string;
  refreshToken: string;
  expiration: string;
}

export interface RegisterUserResponse {
  message: string;
  isSuccess: boolean;
}
