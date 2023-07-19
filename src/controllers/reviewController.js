import Review from '../models/reviewModel.js';
import Campground from '../models/campgroundModel.js';

const createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.session.user_id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();

  req.flash('msg', {
    type: 'success',
    message: 'Successfully made a new review!',
  });
  res.redirect(`/campgrounds/${campground._id}`);
};

const deleteReview = async (req, res) => {
  await Campground.findByIdAndUpdate(req.params.id, {
    $pull: { reviews: req.params.reviewId },
  });
  await Review.findByIdAndDelete(req.params.reviewId);

  req.flash('msg', {
    type: 'success',
    message: 'Successfully deleted a review!',
  });
  res.redirect(`/campgrounds/${req.params.id}`);
};

export { createReview, deleteReview };
