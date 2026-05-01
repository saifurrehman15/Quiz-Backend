import express from 'express'
import quizController from '../../app/quiz/quiz.controller.js';
import questionsController from '../../app/quiz/questions.controller.js';
import middleware from '../../middlewares/middleware.js';
// ---------------------------- IMPORTS ENDS --------------------------- \\

// # EXPRESS ROUTE SETUP
const router = express.Router()
// #MIDDLEWARES
const { authenticateUser } = middleware

// 1) QUIZ CREATE API ROUTE
router.post('/quiz/create', authenticateUser, quizController.create);
// 2) QUIZ GET API ROUTE
router.get('/quiz/show', authenticateUser, quizController.show);
// 3) QUIZ GET API ROUTE
router.get('/quiz/show/:id', authenticateUser, quizController.showOne);
// 4) QUESTIONS GET API ROUTE
router.get('/questions/show/:id', authenticateUser, questionsController.show);
// 5) QUESTIONS GET API ROUTE
router.put('/quiz/update/:id', authenticateUser, quizController.update);
// 6) QUIZ RESULT CREATE API ROUTE
router.post('/quiz/result/create', authenticateUser, quizController.createResult);
// 7) QUIZ RESULT GET API ROUTE
router.get('/quiz/result/show', authenticateUser, quizController.showUserResult);
// 8) QUIZ RESULT DELETE API ROUTE
router.get('/quiz/result/delete/:id', authenticateUser, quizController.delete);


export default router