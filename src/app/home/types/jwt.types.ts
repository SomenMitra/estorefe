import { loggedInUser } from "./user.type";

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  user: loggedInUser;
}

export interface loginToken {
  token: string;
  expiresInSeconds: number;
}
