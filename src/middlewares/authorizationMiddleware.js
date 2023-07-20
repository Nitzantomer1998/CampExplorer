import Campground from '../models/campgroundModel.js';

const isLoggedIn = (req, res, next) => {
  if (req.session.user_id) {
    return next();
  }

  req.flash('msg', {
    type: 'info',
    message: 'Unauthorized access, Please login first',
  });

  res.redirect('/login');
};

const isCampgroundAuthor = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);

  if (campground.author._id.toString() === req.session.user_id) {
    return next();
  }

  req.flash('msg', {
    type: 'info',
    message: 'Unauthorized access, You are not the author of this campground',
  });

  res.redirect(`/campgrounds/${campground._id}`);
};

const isReviewAuthor = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);

  if (campground.author._id.toString() === req.session.user_id) {
    return next();
  }

  const review = campground.reviews.find(
    (review) => review._id.toString() === req.params.reviewId
  );

  if (review === req.session.user_id) {
    return next();
  }

  req.flash('msg', {
    type: 'info',
    message: 'Unauthorized access, You are not the author of this review',
  });

  res.redirect(`/campgrounds/${campground._id}`);
};

export { isLoggedIn, isCampgroundAuthor, isReviewAuthor };
