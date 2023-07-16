import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import isLoggedIn from '../middlewares/AuthorizationMiddleware.js';
import { validateReview } from '../utils/validations.js';
import { createReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post(
  '/campgrounds/:id/reviews',
  isLoggedIn,
  validateReview,
  wrapAsync(createReview)
);

router.delete(
  '/campgrounds/:id/reviews/:reviewId',
  isLoggedIn,
  wrapAsync(deleteReview)
);

export default router;
