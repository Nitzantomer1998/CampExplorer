import {
  joiCampgroundMiddleware,
  joiReviewMiddleware,
} from '../middlewares/joiMiddleware.js';

const validateCampground = (req, res, next) => {
  const { error } = joiCampgroundMiddleware.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = joiReviewMiddleware.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

export { validateCampground, validateReview };
