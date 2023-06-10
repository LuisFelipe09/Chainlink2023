import { Router } from "express";
import {getLogin, getRegister, getRecuperar} from "../model/module.login.mjs"
import {postReviceMessage} from "../services/whatsapp/resolverReciveMessage.mjs"
import {postTestAccount} from "../services/account.mjs"
import {getCreateImage}  from "../services/iaImage/createImage.mjs"

const router = Router();

router.post("/api/register", getRegister);
router.post("/api/login", getLogin);
router.post("/api/recuperar", getRecuperar);
router.post("/api/whatsapp", postReviceMessage);
router.post("/api/account", postTestAccount);
router.get("/api/image", getCreateImage);
export default router;