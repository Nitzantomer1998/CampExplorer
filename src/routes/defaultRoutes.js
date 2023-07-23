import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();

router.get(
  '/',
  wrapAsync(async (req, res) => {
    res.render('home');
  })
);

export default router;
