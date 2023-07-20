import express from 'express';
import multer from 'multer';
import wrapAsync from '../utils/wrapAsync.js';
import cloudinaryStorage from '../configs/cloudinaryConfig.js';
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
  postCampground,
  postUpdatedCampground,
  deleteCampground,
} from '../controllers/campgroundControllers.js';

const uploadImages = multer({ storage: cloudinaryStorage }).array('images', 5);

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
  uploadImages,
  validateCampground,
  wrapAsync(postCampground)
);

router.put(
  '/campgrounds/:id',
  isLoggedIn,
  isCampgroundAuthor,
  uploadImages,
  validateCampground,
  wrapAsync(postUpdatedCampground)
);

router.delete(
  '/campgrounds/:id',
  isLoggedIn,
  isCampgroundAuthor,
  wrapAsync(deleteCampground)
);

export default router;
