export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface AuthResponse extends User {
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}


