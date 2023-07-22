import Campground from '../models/campgroundModel.js';

const isLoggedIn = (req, res, next) => {
  if (!req.session.user_id) {
    req.flash('msg', { type: 'info', message: 'Unauthorized access, Login first' });
    return res.redirect('/login');
  }

  return next();
};

const isCampgroundAuthor = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);

  if (campground.author._id.toString() !== req.session.user_id) {
    req.flash('msg', { type: 'info', message: 'Unauthorized access, You are not the author of this campground' });
    return res.redirect(`/campgrounds/${campground._id}`);
  }

  return next();
};

const isReviewAuthor = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);

  const review = campground.reviews.find((review) => review._id.toString() === req.params.reviewId);

  if (campground.author._id.toString() !== req.session.user_id && review !== req.session.user_id) {
    req.flash('msg', { type: 'info', message: 'Unauthorized access, You are not the author of this review' });
    return res.redirect(`/campgrounds/${campground._id}`);
  }

  return next();
};

export { isLoggedIn, isCampgroundAuthor, isReviewAuthor };
