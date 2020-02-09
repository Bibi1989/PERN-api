"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const getAllContacts_1 = require("../../middlewares/apimiddlewares/getAllContacts");
const auth_1 = require("../../middlewares/auth");
router.get("/", auth_1.Auth, getAllContacts_1.getAllContacts);
exports.default = router;
//# sourceMappingURL=contacts.js.map