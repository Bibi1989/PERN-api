import { Router } from "express";
const router = Router();
import { validateAuth } from "../../middlewares/validation";
import { db, sql } from "../../models/pg-connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.post("/login", async (req: any, res) => {
  const { error, value } = validateAuth(req.body);
  if (error) {
    return res.status(404).json({ error: error.details[0].message });
  }

  const { email, password } = value;
  let [user] = await db.query(sql`SELECT * FROM users WHERE email=${email}`);
  if (!user) {
    return res
      .status(404)
      .json({ error: "You can't login until you register" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(404).json({ error: "Invalid password" });
  }

  try {
    const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    res.header("auth", token);
    res.status(200).json({ data: { email: user.email }, token });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ error: error.message });
  }
});

export default router;
