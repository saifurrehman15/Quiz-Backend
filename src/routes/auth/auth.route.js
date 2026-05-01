import express from 'express'
import authController from '../../app/auth/auth.controller.js';
import middleware from '../../middlewares/middleware.js';
// ---------------------------- IMPORTS ENDS --------------------------- \\

// # EXPRESS ROUTE SETUP
const router = express.Router()
// #MIDDLEWARES
const { authenticateUser } = middleware

// 1) REGISTER API ROUTE
router.post('/auth/register', authController.register);
// 2) LOGIN API ROUTE
router.post('/auth/login', authController.login);
// 2) LOGIN API ROUTE
router.post('/auth/refresh-token', authenticateUser, authController.refreshToken);

export default router