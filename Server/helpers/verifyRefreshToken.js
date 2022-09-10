import UserToken from "../models/UserToken";
import jwt from "jsonwebtoken";

const verifyRefreshToken = (refreshToken) => {
  const PrivateKey = process.env.REFRESH_TOKEN_KEY;

  return new Promise((resolve, reject) => {
    UserToken.findOne({ token: refreshToken }, (err, doc) => {
      if (!doc) {
        return reject({ message: "Invalid Refresh Token" });
      }
      jwt.verify(refreshToken, PrivateKey, (err, tokenDetails) => {
        if (err) {
          return reject({ message: "Invalid Refresh Token" });
        }
        resolve({ tokenDetails, message: "Verified token" });
      });
    });
  });
};

export default verifyRefreshToken;
