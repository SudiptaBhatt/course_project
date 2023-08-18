const express = require('express');
const CourseController = require('../controllers/course.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

/**
 * @swagger
 * /course/add:
 *   post:
 *     summary: Course Add API
 *     security:
 *       - Token: []
 *     tags:
 *       - Course
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: New Course Add
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *                 - name
 *                 - description
 *             properties:
 *                 name:
 *                     type: string
 *                 description:
 *                     type: string
 *     responses:
 *        200:
 *          description: Course Added Successfully
 *        201:
 *          description: Course could not be added
 *        500:
 *          description: Server Error
 */
//Course Add Route
router.post('/course/add', Authentication.Authenticate, request_param.any(), CourseController.courseAdd);

/**
  * @swagger
  * /course/list:
  *   get:
  *     summary: Course List API
  *     security:
  *       - Token: []
  *     tags:
  *       - Course
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: course list fetched successfully
  *       201:
  *         description: No Course Found
  *       500:
  *         description: Server Error
*/
//Course List Route
router.get('/course/list', Authentication.Authenticate, request_param.any(), CourseController.courseList);

module.exports = router;