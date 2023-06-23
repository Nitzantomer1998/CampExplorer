import joi from 'joi';

const joiCampgroundMiddleware = joi.object({
  campground: joi
    .object({
      location: joi.string().required(),
      title: joi.string().required(),
      image: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().required().min(0),
    })
    .required(),
});

const joiReviewMiddleware = joi.object({
  review: joi
    .object({
      body: joi.string().required(),
      rating: joi.number().required().min(1).max(5),
    })
    .required(),
});

const validateCampground = (req, res, next) => {
  console.log('here?');
  const { error } = joiCampgroundMiddleware.validate(req.body);
  console.log(error);
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
