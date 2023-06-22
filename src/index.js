import dotenv from 'dotenv';
import express from 'express';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
import wrapAsync from './utils/wrapAsync.js';
import Review from './models/reviewModel.js';
import connectDB from './configs/database.js';
import ExpressError from './utils/ExpressError.js';
import Campground from './models/campgroundModel.js';
import {
  joiCampgroundMiddleware,
  joiReviewMiddleware,
} from './middlewares/joiMiddleware.js';

dotenv.config();
await connectDB();

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

const validateCampground = (req, res, next) => {
  const { error } = joiCampgroundMiddleware.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = joiReviewMiddleware.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get(
  '/campgrounds',
  wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
  })
);

app.get('/campgrounds/new', async (req, res) => {
  res.render('campgrounds/new');
});

app.post(
  '/campgrounds',
  validateCampground,
  wrapAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();

    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.get(
  '/campgrounds/:id',
  wrapAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate(
      'reviews'
    );
    res.render('campgrounds/show', { campground });
  })
);

app.get(
  '/campgrounds/:id/edit',
  wrapAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
  })
);

app.put(
  '/campgrounds/:id',
  wrapAsync(async (req, res, next) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  '/campgrounds/:id',
  wrapAsync(async (req, res, next) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
  })
);

app.post(
  '/campgrounds/:id/reviews',
  validateReview,
  wrapAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  '/campgrounds/:id/reviews/:reviewId',
  wrapAsync(async (req, res, next) => {
    await Campground.findByIdAndUpdate(req.params.id, {
      $pull: { reviews: req.params.reviewId },
    });
    await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/campgrounds/${req.params.id}`);
  })
);

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((error, req, res, next) => {
  res.render('error', { error });
});

app.listen(process.env.PORT, () => console.log('Server Connected'));
