import { Router } from "express";
const router = Router();
import { validateUsers, validateContacts } from "../../middlewares/validation";

router.post("/", async (req, res) => {
    const {error, value} = validateUsers(req.body)
    if(error) {
        return res.status(404).json({ error: error.details[0].message })
    }

    
});

export default router;
