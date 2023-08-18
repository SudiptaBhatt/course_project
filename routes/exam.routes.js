const express = require('express');
const ExamController = require('../controllers/exam.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

/**
 * @swagger
 * /exam/add:
 *   post:
 *     summary: Exam Add API
 *     security:
 *       - Token: []
 *     tags:
 *       - Exam
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: New Exam Add
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *                 - name
 *                 - course_id
 *                 - total_marks
 *                 - pass_marks
 *                 - exam_time
 *             properties:
 *                 name:
 *                     type: string
 *                 course_id:
 *                     type: string
 *                 total_marks:
 *                     type: number
 *                 pass_marks:
 *                     type: number
 *                 exam_time:
 *                     type: number
 *                 question_answer_set:
 *                     type: array
 *                     items:
 *                         type: object
 *                     properties:
 *                         question:
 *                             type: string
 *                         marks:
 *                             type: number
 *                         answer:
 *                             type: array
 *                             items:
 *                                 type: object
 *                             properties:
 *                                 option: 
 *                                     type: string
 *                                 isCorrectAnswer:
 *                                     type: boolean
 *                                     default: false
 *     responses:
 *        200:
 *          description: Exam Added Successfully
 *        201:
 *          description: Exam could not be added
 *        500:
 *          description: Server Error
 */
//Exam Add Route
router.post('/exam/add', Authentication.Authenticate, request_param.any(), ExamController.examAdd);

/**
  * @swagger
  * /exam/list:
  *   post:
  *     summary: Course Exam List API
  *     security:
  *       - Token: []
  *     tags:
  *       - Exam
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         description: Course Exam List
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *               - course_id
  *           properties:
  *               course_id:
  *                   type: string
  *     responses:
  *       200:
  *         description: Exam list fetched successfully
  *       201:
  *         description: No Exam Found
  *       500:
  *         description: Server Error
*/
//Exam List Route
router.post('/exam/list', Authentication.Authenticate, request_param.any(), ExamController.examList);

module.exports = router;