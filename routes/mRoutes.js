import { Router } from 'express';
import { Admintoall, Admintouser, getmessage, usertoAdmin } from '../controllers/messageController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';



const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *   Message:
 *     type: object
 *     properties:
 *       sender:
 *         type: string
 *         description: The ID of the user who sent the message.
 *       recipient:
 *         type: string
 *         description: The ID of the user who received the message.
 *       message:
 *         type: string
 *         description: The content of the message.
 *       createdAt:
 *         type: string
 *         format: date-time
 *         description: The date and time when the message was created.
 *       updatedAt:
 *         type: string
 *         format: date-time
 *         description: The date and time when the message was last updated.
 *     required:
 *       - sender
 *       - message
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API endpoints for Labreport actions 
 * security:
 *       - BearerAuth: []
*/

/**
 * @swagger
 * /api/blog/message:
 *   post:
 *     summary: Send message from admin to all users
 *     tags:
 *       - Message
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Message sent successfully to all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 newMessages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       '500':
 *         description: Internal server error
 */


router.post("/message", requireSignIn, isAdmin, Admintoall);
router.post("/message/:uid",requireSignIn,isAdmin,Admintouser);

/**
 * @swagger
 * /api/blog/mymsg:
 *   get:
 *     summary: Get messages for the current user (user or admin)
 *     tags:
 *       - Message
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       '500':
 *         description: Internal server error
 */

router.get("/mymsg",requireSignIn,getmessage);
/**
 * @swagger
 * /api/blog/msgtoadmin:
 *   post:
 *     summary: Send message from user to admin
 *     tags:
 *       - Message
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Message sent successfully to admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 newMessages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       '500':
 *         description: Internal server error
 */

router.post("/msgtoadmin",requireSignIn,usertoAdmin);

export default router

