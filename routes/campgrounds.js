import express from 'express';
import multer from 'multer';
import catchAsync from '../utils/catchAsync.js';
import { isLoggedIn, validateCampground, isAuthor } from '../middleware.js';
import * as campgrounds from '../controllers/campgrounds.js';
import { storage } from '../cloudinary/index.js';

const router = express.Router();
const upload = multer({ storage });

router
  .route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

export default router;
