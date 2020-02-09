import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const Auth = async (req: any, res: Response, next: NextFunction) => {
  const token = req["auth"];
  if (!token) {
    res.status(401).json({ error: "you are not authorise" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log({ error: error.message });
    res.status(404).json({ error: error.message });
  }
};
