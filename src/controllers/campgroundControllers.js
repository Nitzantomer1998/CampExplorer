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
  console.log(JSON.stringify(campground));
  res.render('campgrounds/edit', { campground });
};

const saveCampground = async (req, res) => {
  const campground = new Campground(req.body.campground);
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
  await Campground.findByIdAndDelete(req.params.id);

  req.flash('msg', {
    type: 'success',
    message: 'Successfully deleted a campground!',
  });
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
