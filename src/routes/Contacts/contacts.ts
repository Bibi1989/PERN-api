import { Response, Router } from "express";
const router = Router();
import {
  getAllContacts,
  postContacts,
  getAContact
} from "../../middlewares/apimiddlewares/getAllContacts";
import { Auth } from "../../middlewares/auth";

router.get("/", Auth, getAllContacts);

router.get("/:id", Auth, getAContact);

router.post("/", Auth, postContacts);

export default router;
