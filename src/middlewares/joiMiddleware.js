import joi from 'joi';

const joiCampgroundMiddleware = joi.object({
  campground: joi
    .object({
      title: joi.string().required(),
      location: joi.string().required(),
      price: joi.number().required().min(0),
      description: joi.string().required(),

      author: joi.string(),
      geometry: joi.object({
        type: joi.string(),
        coordinates: joi.array().items(joi.number()),
      }),

      images: joi.array().items(
        joi.object({
          url: joi.string().required(),
          filename: joi.string().required(),
        })
      ),
    })
    .required(),

  deleteImages: joi.array(),
});

const joiReviewMiddleware = joi.object({
  review: joi
    .object({
      body: joi.string().required(),
      rating: joi.number().required().min(1).max(5),

      author: joi.string(),
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
