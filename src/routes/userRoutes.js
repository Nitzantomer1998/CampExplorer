import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { validateUser } from '../utils/validations.js';
import {
  getRegisterationPage,
  getLoginPage,
  logoutUser,
  registerUser,
  loginUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/register', wrapAsync(getRegisterationPage));
router.get('/login', wrapAsync(getLoginPage));
router.get('/logout', wrapAsync(logoutUser));

router.post('/register', validateUser, wrapAsync(registerUser));
router.post('/login', wrapAsync(loginUser));

export default router;
