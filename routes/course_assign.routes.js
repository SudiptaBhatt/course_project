const express = require('express');
const CourseAssignController = require('../controllers/course_assign.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

/**
 * @swagger
 * /member/course/assign:
 *   post:
 *     summary: Course Assign To Member API
 *     security:
 *       - Token: []
 *     tags:
 *       - Member
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: Member Course Assign
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *                 - course_id
 *                 - member_id
 *             properties:
 *                 course_id:
 *                     type: string
 *                 member_id:
 *                     type: string
 *     responses:
 *        200:
 *          description: Course assigned to member successfully
 *        201:
 *          description: Member already assigned this course
 *        500:
 *          description: Server Error
 */
//Admin Course Assign To Member
router.post('/member/course/assign', Authentication.Authenticate, request_param.any(), CourseAssignController.memberCourseAssign);

/**
 * @swagger
 * /member/course/list:
 *   post:
 *     summary: Member Assigned Courses List API
 *     security:
 *       - Token: []
 *     tags:
 *       - Member
 *     produces:
 *       - application/json
 *     responses:
 *        200:
 *          description: Member assigned course list fetched successfully
 *        201:
 *          description: Member has no assigned courses
 *        500:
 *          description: Server Error
 */
//Member Course List
router.post('/member/course/list', Authentication.Authenticate, request_param.any(), CourseAssignController.memberCourseList);

module.exports = router;