import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { isLoggedIn, validateCampground, isAuthor } from '../middleware.js';
import * as campgrounds from '../controllers/campgrounds.js';

const router = express.Router();

router
  .route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

export default router;
