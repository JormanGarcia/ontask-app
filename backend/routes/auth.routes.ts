import { authServices } from "../services/auth.service";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";

const { login } = authServices();

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const loginResponse = await login({ email, password });

  if (loginResponse.ok) res.json(loginResponse);

  const token =
    !loginResponse.error && jwt.sign(loginResponse.data, env.Secret!);

  res.json({ user: loginResponse.data, token });
});

export default router;
