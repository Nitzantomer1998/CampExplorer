import baseJoi from 'joi';
import sanitizeHtml from 'sanitize-html';

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: { 'string.escapeHTML': '{{#label}} must not include HTML!' },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error('string.escapeHTML', { value });
        return clean;
      },
    },
  },
});

const Joi = baseJoi.extend(extension);

const joiCampgroundMiddleware = Joi.object({
  campground: Joi.object({
    title: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    description: Joi.string().required().escapeHTML(),
    author: Joi.string().escapeHTML(),
    geometry: Joi.object({
      type: Joi.string().escapeHTML(),
      coordinates: Joi.array().items(Joi.number()),
    }),
    images: Joi.array().items(Joi.object({ url: Joi.string().required().escapeHTML(), filename: Joi.string().required().escapeHTML() })),
  }).required(),

  deleteImages: Joi.array(),
});

const joiReviewMiddleware = Joi.object({
  review: Joi.object({
    body: Joi.string().required().escapeHTML(),
    rating: Joi.number().required().min(1).max(5),
    author: Joi.string().escapeHTML(),
  }).required(),
});

const joiUserMiddleware = Joi.object({
  user: Joi.object({
    username: Joi.string().required().escapeHTML(),
    email: Joi.string().required().escapeHTML(),
    password: Joi.string().required(),
  }).required(),
});

export { joiCampgroundMiddleware, joiReviewMiddleware, joiUserMiddleware };
