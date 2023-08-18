const express = require('express');
const UserController = require('../controllers/user.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: User Registration
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: body
 *        description: Admin User Registration
 *        required: true
 *        schema:
 *             type: object
 *             required:
 *                 - name
 *                 - email
 *                 - phone
 *                 - gender
 *                 - password
 *             properties:
 *                 name:
 *                     type: string 
 *                 email:
 *                     type: string 
 *                 phone:
 *                     type: string
 *                 gender:
 *                     type: string
 *                 password:
 *                     type: string
 *     responses:
 *        200:
 *          description: Admin Registration Successful
 *        201:
 *          description: Admin Registration Unsuccessful
 *        500:
 *          description: Server Error
 */
//User Registration Route
router.post('/registration', request_param.any(), UserController.registration);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: Admin / Member Login
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *                 - email
 *                 - password
 *             properties:
 *                 email:
 *                     type: string
 *                 password:
 *                     type: string
 *                 
 *     responses:
 *        200:
 *          description: Logged in successfully!
 *        201:
 *          description: Password not matched
 *        500:
 *          description: Server Error
 */
//User Login Route
router.post('/login', request_param.any(), UserController.login);

/**
 * @swagger
 * /member/add:
 *   post:
 *     summary: Create Member
 *     security:
 *       - Token: []
 *     tags:
 *       - Member
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: body
 *        description: Create New Member
 *        required: true
 *        schema:
 *             type: object
 *             required:
 *                 - name
 *                 - email
 *                 - phone
 *                 - gender
 *                 - password
 *             properties:
 *                 name:
 *                     type: string 
 *                 email:
 *                     type: string 
 *                 phone:
 *                     type: string
 *                 gender:
 *                     type: string
 *                 password:
 *                     type: string
 *     responses:
 *        200:
 *          description: Member Created Successfully
 *        201:
 *          description: Member could not be created
 *        500:
 *          description: Server Error
 */
//Admin Create New Member
router.post('/member/add', Authentication.Authenticate, request_param.any(), UserController.memberAdd);

module.exports = router;