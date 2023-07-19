import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { validateCampground } from '../utils/validations.js';
import {
  isLoggedIn,
  isCampgroundAuthor,
} from '../middlewares/AuthorizationMiddleware.js';
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
  isCampgroundAuthor,
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
  isCampgroundAuthor,
  validateCampground,
  wrapAsync(saveEditedCampground)
);

router.delete(
  '/campgrounds/:id',
  isLoggedIn,
  isCampgroundAuthor,
  wrapAsync(deleteCampground)
);

export default router;
