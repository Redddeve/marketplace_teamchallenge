import express from 'express';

import { appendFileNamesToBody, upload } from '../../middlewares/uploadProducts.js';
import productController from '../controllers/productController.js';

const productRoute = express.Router();
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Creates a new product
 *     tags:
 *        - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: Product name
 *               description:
 *                 type: string
 *                 required: true
 *                 description: Product description
 *               price:
 *                 type: number
 *                 required: true
 *                 format: double
 *                 description: Product price
 *               discount:
 *                 type: number
 *                 required: true
 *                 format: int
 *                 description: Product price
 *               category:
 *                 type: string
 *                 required: true
 *                 description: Product category
 *               quantity:
 *                 type: number
 *                 required: true
 *                 format: int64
 *                 description: Quantity
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Product image
 *
 *
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               typevj;yf: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:  Invalid request body
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

productRoute.post(
  '/',
  upload.array('images'),
  appendFileNamesToBody,
  productController.createProduct,
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieves a list of products
 *     description: Optional extended description in Markdown.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limit number of products returned.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Offset in products list.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the product to search for.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by product category.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: '_id'
 *         description: Field to sort by.
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: integer
 *           enum: [1, -1]
 *           default: 1
 *         description: Sort direction, where 1 is ascending and -1 is descending.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productRoute.get('/', productController.getAllProducts);

export default productRoute;
