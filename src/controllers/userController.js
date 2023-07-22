import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

const getRegisterationPage = async (req, res) => { res.render('users/register') };

const getLoginPage = async (req, res) => { res.render('users/login') };

const getLogoutUser = async (req, res) => {
  req.session.user_id = null;
  req.flash('msg', { type: 'success', message: 'Goodbye!' });
  res.redirect('/');
};

const registerUser = async (req, res) => {
  if (await User.findOne({ username: req.body.user.username })) {
    req.flash('msg', { type: 'info', message: 'Username already taken' });
    return res.redirect('/register');
  }

  if (await User.findOne({ email: req.body.user.email })) {
    req.flash('msg', { type: 'info', message: 'Email already taken' });
    return res.redirect('/register');
  }

  const newUser = await User.create({
    username: req.body.user.username,
    email: req.body.user.email,
    password: await bcrypt.hash(req.body.user.password, 12),
  });

  req.session.user_id = newUser._id;
  req.flash('msg', { type: 'success', message: 'Welcome to CampExplorer!' });
  res.redirect('/campgrounds');
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.user.username });

  if (!user) {
    req.flash('msg', { type: 'info', message: 'User not found' });
    return res.redirect('/login');
  }

  if (!(await bcrypt.compare(req.body.user.password, user.password))) {
    req.flash('msg', { type: 'info', message: 'Incorrect password' });
    return res.redirect('/login');
  }

  req.session.user_id = user._id;
  req.flash('msg', { type: 'success', message: 'Welcome back!' });
  res.redirect('/campgrounds');
};

export {
  getRegisterationPage,
  getLoginPage,
  getLogoutUser,
  registerUser,
  loginUser,
};
