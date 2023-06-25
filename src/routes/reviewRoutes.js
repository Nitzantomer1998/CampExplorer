import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { validateReview } from '../utils/validations.js';
import {
  getAllReviews,
  deleteReview,
} from '../controllers/reviewController.js';

const router = express.Router();

router.post(
  '/campgrounds/:id/reviews',
  validateReview,
  wrapAsync(getAllReviews)
);

router.delete('/campgrounds/:id/reviews/:reviewId', wrapAsync(deleteReview));

export default router;
