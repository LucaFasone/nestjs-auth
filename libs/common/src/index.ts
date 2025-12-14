export * from './common.module';
export * from './common.service';
export * from './dto/create-user.dto'
import { JwtPayload as BaseJwtPayload } from 'jsonwebtoken'

export enum Auth {
  HEALTH = "heatlh",
  REGISTER = "register",
  GET_USERS = "get_users",
  LOGIN = "login",
  GET_ME = "get_me",
}

export enum Services {
  AUTH = 'AUTH',
}

export interface JWTPayload extends BaseJwtPayload {
  id: string;
  email: string;
}
