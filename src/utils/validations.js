import ExpressError from '../utils/ExpressError.js';
import { joiCampgroundMiddleware, joiReviewMiddleware, joiUserMiddleware } from '../middlewares/joiMiddleware.js';

const validateCampground = (req, res, next) => {
  const { error } = joiCampgroundMiddleware.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  }

  next();
};

const validateReview = (req, res, next) => {
  const { error } = joiReviewMiddleware.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  }

  next();
};

const validateUser = (req, res, next) => {
  const { error } = joiUserMiddleware.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  }

  next();
};

export { validateCampground, validateReview, validateUser };
