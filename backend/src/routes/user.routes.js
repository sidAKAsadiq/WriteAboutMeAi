import { Router } from "express";
import { generate_about_section, get_current_user, login_user, logout_user, register_user } from "../controllers/user.controller.js";
import { verify_jwt } from "../middlewares/auth.middleware.js"

const router = Router()
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });
router.route('/register').post(register_user)
router.route('/login').post(login_user)
router.route('/logout').get(verify_jwt,logout_user)
router.route('/get_current_user').get(verify_jwt,get_current_user)
router.route('/generate_about_section').post(generate_about_section)

export default router
