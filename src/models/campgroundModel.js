import mongoose from 'mongoose';

const CampgroundSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  location: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  description: { type: String, required: true },

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

const Campground = mongoose.model('Campground', CampgroundSchema);

export default Campground;
