import Review from '../models/reviewModel.js';
import Campground from '../models/campgroundModel.js';

const postReview = async (req, res) => {
  const review = await new Review({
    ...req.body.review,
    author: req.session.user_id,
  }).save();

  const campground = await Campground.findByIdAndUpdate(req.params.id, { $push: { reviews: review }});

  req.flash('msg', { type: 'success', message: 'Successfully made a review!' });
  res.redirect(`/campgrounds/${campground._id}`);
};

const deleteReview = async (req, res) => {
  await Campground.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId }});

  await Review.findByIdAndDelete(req.params.reviewId);

  req.flash('msg', {type: 'success',message: 'Successfully deleted a review!'});
  res.redirect(`/campgrounds/${req.params.id}`);
};

export { postReview, deleteReview };
