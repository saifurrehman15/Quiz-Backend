import express from 'express'
import subjectsController from '../../app/subjects/subjects.controller.js';
import middleware from '../../middlewares/middleware.js';
// ---------------------------- IMPORTS ENDS --------------------------- \\

// # EXPRESS ROUTE SETUP
const router = express.Router()
// #MIDDLEWARES
const { authenticateUser } = middleware

// 1) SUBJECT CREATE API ROUTE
router.post('/subject/create', subjectsController.create);
// 2) SUBJECT GET API ROUTE
router.get('/subject/show',authenticateUser, subjectsController.show);


export default router