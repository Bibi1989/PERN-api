import { Response, Router } from "express";
const router = Router();
import { getAllContacts } from "../../middlewares/apimiddlewares/getAllContacts";
import {Auth} from '../../middlewares/auth'

router.get("/", Auth, getAllContacts);

export default router;
