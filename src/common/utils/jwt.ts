import { JwtSignOptions } from "@nestjs/jwt";

export const JwtAccesToken:JwtSignOptions = {
    secret:"malina",
    expiresIn:"7h"
}


export const JwtRefreshToken:JwtSignOptions = {
    secret:"malina",
    expiresIn:"2h"
}