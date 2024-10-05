import express from "express";
import { getmyprofile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/all", getallusers);

router.post("/new", register);
router.post("/login",login);
router.get("/logout",logout);

router.get("/me",isAuthenticated ,getmyprofile);                    

//   .put(updatedetails)
//   .delete(deletedetails);                          //isko thora mvc k roop m likha gya h

// router.get("/userid/:id",getusersdetails);

// router.put("/userid/:id",updatedetails);

// router.delete("/userid/:id",deletedetails);

// router.get("/userid/special", specialfunc);

export default router;