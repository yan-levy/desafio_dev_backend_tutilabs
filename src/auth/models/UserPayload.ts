export interface UserPayload {
  sub: number;
  email: string;
  name: string;
  role: number;
  iat?: number;
  exp?: number;
}
