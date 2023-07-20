import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { validateUser } from '../utils/validations.js';
import {
  getRegisterationPage,
  getLoginPage,
  getLogoutUser,
  postRegisterUser,
  postLoginUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/register', wrapAsync(getRegisterationPage));
router.get('/login', wrapAsync(getLoginPage));
router.get('/logout', wrapAsync(getLogoutUser));

router.post('/register', validateUser, wrapAsync(postRegisterUser));
router.post('/login', wrapAsync(postLoginUser));

export default router;
