import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: Number,
  body: String,
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
