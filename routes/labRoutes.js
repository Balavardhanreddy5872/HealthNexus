import { Router } from "express";
import { LabstatusController, getLabCountController, getlabReportController, labformController, labstatusController } from "../controllers/labController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = Router()

router.post('/report', requireSignIn, labformController);
router.get('/formstatus', requireSignIn, labstatusController);
router.get('/all-lab', requireSignIn, isAdmin, getlabReportController);
router.put(
  "/lab-status/:orderId",
  requireSignIn,
  isAdmin,
  LabstatusController
);
router.get('/labcnt',requireSignIn,getLabCountController);

export default router;