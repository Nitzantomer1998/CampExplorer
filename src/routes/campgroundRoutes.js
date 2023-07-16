import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import isLoggedIn from '../middlewares/AuthorizationMiddleware.js';
import { validateCampground } from '../utils/validations.js';
import {
  getAllCampgroundsPage,
  getNewCampgroundPage,
  getCampgroundPage,
  getEditCampgroundPage,
  saveCampground,
  saveEditedCampground,
  deleteCampground,
} from '../controllers/campgroundControllers.js';

const router = express.Router();

router.get('/campgrounds', isLoggedIn, wrapAsync(getAllCampgroundsPage));
router.get('/campgrounds/new', isLoggedIn, wrapAsync(getNewCampgroundPage));
router.get('/campgrounds/:id', isLoggedIn, wrapAsync(getCampgroundPage));
router.get(
  '/campgrounds/:id/edit',
  isLoggedIn,
  wrapAsync(getEditCampgroundPage)
);

router.post(
  '/campgrounds',
  isLoggedIn,
  validateCampground,
  wrapAsync(saveCampground)
);

router.put(
  '/campgrounds/:id',
  isLoggedIn,
  validateCampground,
  wrapAsync(saveEditedCampground)
);

router.delete('/campgrounds/:id', isLoggedIn, wrapAsync(deleteCampground));

export default router;
