import express from 'express'
import userController from '../../app/users/user.controller.js';
import middleware from '../../middlewares/middleware.js';
// ---------------------------- IMPORTS ENDS --------------------------- \\

// # EXPRESS ROUTE SETUP
const router = express.Router()
// #MIDDLEWARES
const { authenticateUser } = middleware

// 1) USER GET API ROUTE
router.get('/user/show', authenticateUser, userController.show);
// 2) USER GET API ROUTE
router.get('/user/current', authenticateUser, userController.showOne);
// 3) USER CHEAT CREATE API ROUTE
router.post('/user/cheated', authenticateUser, userController.createCheated);
// 3) USER CREATE API ROUTE
router.post('/user/cheated/clear', authenticateUser, userController.cheatedClear);


export default router
