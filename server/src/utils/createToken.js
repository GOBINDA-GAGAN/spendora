import config from "../config/env.config.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";


export const createAccessToken = (payload) => {

    const token = jwt.sign(payload, config.accessTokenSecret, { expiresIn: config.accessTokenExpiration });
    return token;
}

export const createRefreshToken = (payload) => {
  return jwt.sign(
    {
      ...payload,
      jti: crypto.randomUUID(),
    },
    config.refreshTokenSecret,
    {
      expiresIn: config.refreshTokenExpiration,
    }
  );
};

export const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.accessTokenSecret);
        return decoded;
    } catch (error) {
        throw new Error("Invalid access token");
    }
};

export const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.refreshTokenSecret);
        return decoded;
    } catch (error) {
        throw new Error("Invalid refresh token");
    }
};
