import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { validateCampground } from '../utils/validations.js';
import {
  getAllCampgrounds,
  createCampground,
  showCampground,
  editCampground,
  saveCampground,
  saveEditedCampground,
  deleteCampground,
} from '../controllers/campgroundControllers.js';

const router = express.Router();

router.get('/campgrounds', wrapAsync(getAllCampgrounds));
router.get('/campgrounds/new', wrapAsync(createCampground));
router.get('/campgrounds/:id', wrapAsync(showCampground));
router.get('/campgrounds/:id/edit', wrapAsync(editCampground));

router.post('/campgrounds', validateCampground, wrapAsync(saveCampground));

router.put(
  '/campgrounds/:id',
  validateCampground,
  wrapAsync(saveEditedCampground)
);

router.delete('/campgrounds/:id', wrapAsync(deleteCampground));

export default router;
