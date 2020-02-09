import { Router } from "express";
const router = Router();
import { validateUsers } from "../../middlewares/validation";
import { db, sql } from "../../models/pg-connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.post("/register", async (req: any, res) => {
  const { error, value } = validateUsers(req.body);
  if (error) {
    return res.status(404).json({ error: error.details[0].message });
  }

  const { username, email, password } = value;
  let [user] = await db.query(
    sql`SELECT email FROM users WHERE email=${email}`
  );
  if (user) {
    return res.status(404).json({ error: "User exist" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    user = await db.query(
      sql`INSERT INTO users(username, email, password) VALUES (${username}, ${email}, ${hashedPassword}) returning email, username`
    );
    const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    res.header("auth", token);
    res.status(200).json({ data: user, token });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ error: error.message });
  }
});

export default router;
