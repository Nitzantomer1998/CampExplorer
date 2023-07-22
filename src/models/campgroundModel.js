import mongoose from 'mongoose';

const CampgroundSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  geometry: { type: { type: String, enum: ['Point'] }, coordinates: { type: [Number] }},
  images: [{ url: String, filename: String }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const Campground = mongoose.model('Campground', CampgroundSchema);

export default Campground;
