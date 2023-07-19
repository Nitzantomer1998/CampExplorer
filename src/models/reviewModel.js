import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: Number,
  body: String,
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
