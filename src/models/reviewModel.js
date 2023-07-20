import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: { type: Number, required: true },
  body: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
