import Review from '../models/reviewModel.js';
import Campground from '../models/campgroundModel.js';

const getAllCampgroundsPage = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
};

const getNewCampgroundPage = async (req, res) => {
  res.render('campgrounds/new');
};

const getCampgroundPage = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate('author')
    .populate({ path: 'reviews', populate: { path: 'author' } });

  res.render('campgrounds/show', { campground });
};

const getEditCampgroundPage = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  console.log(JSON.stringify(campground));
  res.render('campgrounds/edit', { campground });
};

const saveCampground = async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.session.user_id;
  await campground.save();

  req.flash('msg', {
    type: 'success',
    message: 'Successfully made a new campground!',
  });
  res.redirect(`/campgrounds/${campground._id}`);
};

const saveEditedCampground = async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(req.params.id, {
    ...req.body.campground,
  });

  req.flash('msg', {
    type: 'success',
    message: 'Successfully updated a campground!',
  });
  res.redirect(`/campgrounds/${campground._id}`);
};

const deleteCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  await Review.deleteMany({ _id: { $in: campground.reviews } });
  await Campground.findByIdAndDelete(req.params.id);

  req.flash('msg', {
    type: 'success',
    message: 'Successfully deleted a campground!',
  });
  res.redirect('/campgrounds');
};

export {
  getAllCampgroundsPage,
  getNewCampgroundPage,
  getCampgroundPage,
  getEditCampgroundPage,
  saveCampground,
  saveEditedCampground,
  deleteCampground,
};
