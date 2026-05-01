import express from 'express'
import subjectsController from '../../app/subjects/subjects.controller.js';
// ---------------------------- IMPORTS ENDS --------------------------- \\

// # EXPRESS ROUTE SETUP
const router = express.Router()
// #MIDDLEWARES

// 1) SUBJECT CREATE API ROUTE
router.post('/subject/create', subjectsController.create);
// 1) SUBJECT GET API ROUTE
router.get('/subject/show', subjectsController.show);


export default router