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

const joiUserMiddleware = joi.object({
  user: joi
    .object({
      username: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
    })
    .required(),
});

export { joiCampgroundMiddleware, joiReviewMiddleware, joiUserMiddleware };
