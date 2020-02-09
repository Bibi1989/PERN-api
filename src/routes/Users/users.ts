import { Router } from "express";
const router = Router();
import { validateUsers } from "../../middlewares/validation";
import { db, sql } from "../../models/pg-connect";
import bcrypt from "bcryptjs";

router.post("/", async (req, res) => {
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
    return res.json(...user);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ error: error.message });
  }
});

export default router;
