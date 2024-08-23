import { Router } from "express";
import { get_current_user, login_user, logout_user, register_user } from "../controllers/user.controller.js";
import { verify_jwt } from "../middlewares/auth.middleware.js"

const router = Router()

router.route('/register').post(register_user)
router.route('/login').post(login_user)
router.route('/logout').get(verify_jwt,logout_user)
router.route('/get_current_user').get(verify_jwt,get_current_user)

export default router
