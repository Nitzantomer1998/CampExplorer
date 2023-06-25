import Campground from '../models/campgroundModel.js';

const getAllCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
};

const createCampground = async (req, res) => {
  res.render('campgrounds/new');
};

const showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate(
    'reviews'
  );
  res.render('campgrounds/show', { campground });
};

const editCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/edit', { campground });
};

const saveCampground = async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();

  res.redirect(`/campgrounds/${campground._id}`);
};

const saveEditedCampground = async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(req.params.id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
};

const deleteCampground = async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  res.redirect('/campgrounds');
};

export {
  getAllCampgrounds,
  createCampground,
  showCampground,
  editCampground,
  saveCampground,
  saveEditedCampground,
  deleteCampground,
};
