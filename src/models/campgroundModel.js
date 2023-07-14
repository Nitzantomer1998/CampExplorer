import mongoose from 'mongoose';

const CampgroundSchema = new mongoose.Schema({
  location: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
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
