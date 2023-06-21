import dotenv from 'dotenv';
import express from 'express';
import connectDB from './configs/database.js';
import Campground from './models/campground.js';
import methodOverride from 'method-override';

dotenv.config();
await connectDB();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  res.render('home');
});

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/new', async (req, res) => {
  res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

app.get('/campgrounds/:id', async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/:id/edit', async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/:id', async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(req.params.id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  res.redirect('/campgrounds');
});

app.listen(process.env.PORT, () => console.log('Server Connected'));
