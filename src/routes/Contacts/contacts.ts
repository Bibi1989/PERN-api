import { Response, Router } from "express";
const router = Router();
import { getAllContacts, postContacts } from "../../middlewares/apimiddlewares/getAllContacts";
import {Auth} from '../../middlewares/auth'

router.get("/", Auth, getAllContacts);

router.post("/", Auth, postContacts)

export default router;
