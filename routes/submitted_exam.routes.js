const express = require('express');
const MemberExamController = require('../controllers/submitted_exam.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

/**
 * @swagger
 * /member/exam/submit:
 *   post:
 *     summary: Member Exam Submit API
 *     security:
 *       - Token: []
 *     tags:
 *       - Member
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: Member Exam Submit
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *                 - exam_id
 *                 - question_answers
 *             properties:
 *                 exam_id:
 *                     type: string
 *                 marks_obtained:
 *                     type: number
 *                 question_answers:
 *                     type: array
 *                     items:
 *                         type: object
 *                     properties:
 *                         question_id:
 *                             type: string
 *                         marks:
 *                             type: number
 *                         answer:
 *                             type: string
 *     responses:
 *        200:
 *          description: Member submitted exam successfully
 *        201:
 *          description: Exam could not be submitted!
 *        500:
 *          description: Server Error
 */
//Member Exam Submit
router.post('/member/exam/submit', Authentication.Authenticate, request_param.any(), MemberExamController.memberExamSubmit);

/**
 * @swagger
 * /member/exam/result:
 *   post:
 *     summary: Member Exam Result View API
 *     security:
 *       - Token: []
 *     tags:
 *       - Member
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: Member Exam Result
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *                 - exam_id
 *                 - member_id
 *             properties:
 *                 exam_id:
 *                     type: string
 *                 member_id:
 *                     type: string
 *     responses:
 *        200:
 *          description: Exam result details for this member fetched successfully
 *        201:
 *          description: member has not submitted this exam!
 *        500:
 *          description: Server Error
 */
//Member Exam Submit
router.post('/member/exam/result', Authentication.Authenticate, request_param.any(), MemberExamController.examResult);

module.exports = router;