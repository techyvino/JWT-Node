import { Router } from "express";
import User from "../models/User.js";
import { signUpBodyValidator } from "../utils/ValidationSchema.js";
import bcrypt from "bcrypt";

const router = Router();

// ─── Signup ─────────────────────────────────────────────────────────────────────

router.post("/signup", async (req, res) => {
  try {
    const { error } = signUpBodyValidator(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ username: req.body.username });
    const email = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).json({ message: "User already exist." });
    if (email) return res.status(400).json({ message: "Email id already register with us." });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const userData = await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).json({ userDetails: userData, message: "Account Created Successfully." });
  } catch (error) {
    console.log(error);
    console.log("error", error?.message);
    res.status(500).json({ message: "Internal Server Error." + error });
  }
});

export default router;
