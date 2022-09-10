import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";

const generateToken = async (user) => {
  try {
    const payload = { _id: user._id, username: user.username };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: "14m" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: "14m" });

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.remove();

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;
