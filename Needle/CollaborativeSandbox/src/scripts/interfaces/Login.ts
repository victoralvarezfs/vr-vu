export interface UserCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  success: boolean;
  userId: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}
