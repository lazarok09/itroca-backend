import { Request } from "express";
import { VerifyJWTResultDecoded } from "../lib/jsonwebtoken";

interface CustomUserRequest extends Request {
  user: VerifyJWTResultDecoded;
}