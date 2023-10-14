import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { validateReview, isLoggedIn, isReviewAuthor } from '../middleware.js';
import * as reviews from '../controllers/review.js';

const router = express.Router({ mergeParams: true });

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

export default router;
