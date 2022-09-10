import { Router } from "express";
import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";
import verifyRefreshToken from "../helpers/verifyRefreshToken.js";
import { refreshTokenBodyValidator } from "../utils/ValidationSchema";

const router = Router();

// get new access token
router.post("/", (req, res) => {
  try {
    const { error } = refreshTokenBodyValidator(req.body);
    if (error) return res.status(401).json({ message: error.details[0].message });

    verifyRefreshToken(req.body.refreshToken).then(({ tokenDetails }) => {
      const payload = { _id: tokenDetails._id, username: user.username };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: "14m" });
      res.status(200).json({
        accessToken,
        message: "Access token create successfully",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// logout

router.delete("/", async (req, res) => {
  try {
    const { error } = refreshTokenBodyValidator(req.body);
    if (error) return res.status(401).json({ message: error.details[0].message });
    const userToken = await UserToken.findOne({ token: req.body.refreshToken });
    if (!userToken) return res.status(200).json({ message: "Logout Successfully" });
    await userToken.remove();
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
