import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { addProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, deleteProductController, searchProductcontroller, brainTreePaymentController, braintreeTokenController, getTotalProductCountController } from "../controllers/ProductController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Products:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: The name of the product.
 *       seller:
 *         type: string
 *         description: The seller of the product.
 *       slug:
 *         type: string
 *         description: The slug of the product.
 *       description:
 *         type: string
 *         description: The description of the product.
 *       price:
 *         type: number
 *         description: The price of the product.
 *       quantity:
 *         type: number
 *         description: The quantity of the product.
 *       photo:
 *         type: object
 *         properties:
 *           data:
 *             type: string
 *             format: binary
 *             description: The binary data of the photo.
 *           contentType:
 *             type: string
 *             description: The content type of the photo.
 *       shipping:
 *         type: boolean
 *         description: Indicates if shipping is available for the product.
 *     required:
 *       - name
 *       - seller
 *       - slug
 *       - description
 *       - price
 *       - quantity
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for Labreport actions 
 * security:
 *       - BearerAuth: []
*/


/**
 * @swagger
 * /api/product/add-medicine:
 *   post:
 *     summary: Add medicine
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               seller:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 products:
 *                   $ref: '#/components/schemas/Products'
 *       '500':
 *         description: Internal server error
 */

// Add medicine only admin
router.post('/add-medicine', requireSignIn, isAdmin, formidable(), addProductController);


/**
 * @swagger
 * /api/product/get-medicine:
 *   get:
 *     summary: all medicines
 *     tags:
 *        - Products
 *     responses:
 *       '200':
 *         description: All products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 counTotal:
 *                   type: number
 *                 message:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Products'
 *       '500':
 *         description: Internal server error
 */

router.get("/get-medicine", getProductController);

/**
 * @swagger
 * /api/product/get-medicine/{slug}:
 *   get:
 *     summary: Get single medicine
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the product to retrieve
 *     responses:
 *       '200':
 *         description: Single product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Products'
 *       '500':
 *         description: Internal server error
 */

router.get("/get-medicine/:slug", getSingleProductController);


router.get("/medicine-photo/:pid", productPhotoController);


/**
 * @swagger
 * /api/product/update-product/{pid}:
 *   put:
 *     summary: Update product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               seller:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 products:
 *                   $ref: '#/components/schemas/Products'
 *       '500':
 *         description: Internal server error
 */


router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

/**
 * @swagger
 * /api/delete-product/{pid}:
 *   delete:
 *     summary: Delete product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error
 */

router.delete("/delete-product/:pid", deleteProductController);

/**
 * @swagger
 * /api/product/search/{keyword}:
 *   get:
 *     summary: Search products
 *     tags:
 *       - Search
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: The keyword to search for in product names or descriptions
 *     responses:
 *       '200':
 *         description: Products found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.get("/search/:keyword", searchProductcontroller);


router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

router.get("/productcount", requireSignIn, isAdmin, getTotalProductCountController);

export default router;