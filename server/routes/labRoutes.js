import { Router } from "express";
import { LabstatusController, getLabCountController, getlabReportController, labformController, labstatusController } from "../controllers/labController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *   Lab:
 *     type: object
 *     properties:
 *       buyer:
 *         type: string
 *         description: The ID of the buyer (user) associated with the lab report.
 *       name:
 *         type: string
 *         description: The name associated with the lab report.
 *       number:
 *         type: string
 *         description: The contact number associated with the lab report.
 *       pincode:
 *         type: string
 *         description: The pincode associated with the lab report.
 *       Package:
 *         type: string
 *         description: The package associated with the lab report.
 *       test:
 *         type: string
 *         description: The test associated with the lab report.
 *       status:
 *         type: string
 *         description: The status of the lab report.
 *         enum:
 *           - claim sent
 *           - Samples collected
 *           - Report in Progress
 *           - Report completed
 *           - Report cancelled
 *     required:
 *       - buyer
 *       - name
 *       - number
 *       - pincode
 *       - Package
 *       - test
 */


/**
 * @swagger
 * tags:
 *   name: LabReports
 *   description: API endpoints for Labreport actions 
 * security:
 *       - BearerAuth: []
*/


/**
 * @swagger
 * /api/lab/report:
 *   post:
 *     summary: Submit lab report
 *     tags:
 *       - Lab
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lab'
 *     responses:
 *       '201':
 *         description: Lab report registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lab'
 *       '500':
 *         description: Internal server error
 */


router.post('/report', requireSignIn, labformController);


/**
 * @swagger
 * /api/lab/formstatus:
 *   get:
 *     summary: Get lab form status
 *     tags: [Lab]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lab form status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lab'
 *       '500':
 *         description: Internal server error
 */

router.get('/formstatus', requireSignIn, labstatusController);

/**
 * @swagger
 * /api/lab/all-lab:
 *   get:
 *     summary: Get all lab reports
 *     tags:
 *       - Lab
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: List of lab reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lab:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lab'
 *       '500':
 *         description: Internal server error
 */

router.get('/all-lab', requireSignIn, isAdmin, getlabReportController);
router.put(
  "/lab-status/:orderId",
  requireSignIn,
  isAdmin,
  LabstatusController
);
router.get('/labcnt', requireSignIn, getLabCountController);

export default router;