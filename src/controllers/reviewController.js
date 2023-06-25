import Review from '../models/reviewModel.js';
import Campground from '../models/campgroundModel.js';

const getAllReviews = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
};

const deleteReview = async (req, res) => {
  await Campground.findByIdAndUpdate(req.params.id, {
    $pull: { reviews: req.params.reviewId },
  });
  await Review.findByIdAndDelete(req.params.reviewId);
  res.redirect(`/campgrounds/${req.params.id}`);
};

export { getAllReviews, deleteReview };
