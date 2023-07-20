import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { validateReview } from '../utils/validations.js';
import {
  isLoggedIn,
  isReviewAuthor,
} from '../middlewares/AuthorizationMiddleware.js';
import { postReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post(
  '/campgrounds/:id/reviews',
  isLoggedIn,
  validateReview,
  wrapAsync(postReview)
);

router.delete(
  '/campgrounds/:id/reviews/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(deleteReview)
);

export default router;
