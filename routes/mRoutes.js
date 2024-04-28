import { Router } from 'express';
import { Admintoall, Admintouser, getmessage, usertoAdmin } from '../controllers/messageController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';



const router = Router()

router.post("/message", requireSignIn, isAdmin, Admintoall);
router.post("/message/:uid",requireSignIn,isAdmin,Admintouser);
router.get("/mymsg",requireSignIn,getmessage);
router.post("/msgtoadmin",requireSignIn,usertoAdmin);

export default router

