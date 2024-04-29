import { Router } from 'express';
import { registerController, logincontroller, verifyController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getUsercontroller, getTotalusersCountController, getTotalOrdersCountController, getOrdersCountController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   users:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: The name of the user.
 *       email:
 *         type: string
 *         format: email
 *         description: The email address of the user.
 *       password:
 *         type: string
 *         description: The password of the user.
 *       phone:
 *         type: string
 *         description: The phone number of the user.
 *       address:
 *         type: string
 *         description : Address of the user 
 *       role:
 *         type: number
 *         description: The role of the user. (0 for default)
 *         default : 0
 *     required:
 *       - name
 *       - email
 *       - password
 *       - phone
 *       - address
*/


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for authentication actions 
 * security:
 *       - JWTAuth: []
*/

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               address :
 *                 type : string 
 *     responses:
 *       201:
 *         description: user registred succesful
 *       422:
 *         description: User with this email already exists
 *       500:
 *         description: Failed to register admin
 */
router.post('/register', registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       404:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post('/login', logincontroller);



router.get('/verify', requireSignIn, isAdmin, verifyController);

// user route-path 
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// admin route-path
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});


/**
 * @swagger
 * /api/auth/allusers:
 *   get:
 *     summary: Get all users
 *     tags: [users]
 *     security:
 *       - BearerAuth : []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/users'
 *       500:
 *         description: Internal server error
 */
router.get("/allusers", requireSignIn, isAdmin, getUsercontroller);

/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates whether the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Profile Updated Successfully
 *                   description: A message indicating the result of the operation.
 *                 updatedUser:
 *                   $ref: '#/components/schemas/users'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates whether the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Error While Updating Profile
 *                   description: A message indicating the reason for the bad request.
 *                 error:
 *                   type: string
 *                   description: The error message.
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates whether the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Error While Updating Profile
 *                   description: A message indicating the result of the operation.
 *                 error:
 *                   type: string
 *                   description: The error message.
 */

router.put("/profile", requireSignIn, updateProfileController);

/**
 * @swagger
 * /api/auth/orders:
 *   get:
 *     summary: Get orders for the authenticated user
 *     tags: [order]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/users'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates whether the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Error While Getting Orders
 *                   description: A message indicating the result of the operation.
 *                 error:
 *                   type: string
 *                   description: The error message.
 */

//orders
router.get("/orders", requireSignIn, getOrdersController);

/**
 * @swagger
 * /api/auth/all-orders:
 *   get:
 *     summary: Get all orders
 *     tags: [order]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates whether the operation was successful.
 *                 message:
 *                   type: string
 *                   example: Error While Getting Orders
 *                   description: A message indicating the result of the operation.
 *                 error:
 *                   type: string
 *                   description: The error message.
 */

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);



// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

router.get('/userscount', requireSignIn, isAdmin, getTotalusersCountController);
router.get('/ordercount', requireSignIn, isAdmin, getTotalOrdersCountController);
router.get('/ordercnt', requireSignIn, getOrdersCountController);

export default router;

