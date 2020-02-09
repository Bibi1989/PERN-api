import { Response } from "express";
import { Contacts } from "../interface";
import { db, sql } from "../../models/pg-connect";

export const getAllContacts = async (req: any, res: Response) => {
  try {
    const contacts = await db.query(
      sql`SELECT * FROM contacts WHERE user_id=${req.user.id}`
    );
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
};
