import express from 'express';
import passport from 'passport';
import catchAsync from '../utils/catchAsync.js';
import { storeReturnTo } from '../middleware.js';
import * as users from '../controllers/users.js';

const router = express.Router();

router.get('/register', users.renderRegister);

router.post('/register', catchAsync(users.register));

router.get('/login', users.renderLogin);

router.post(
  '/login',
  storeReturnTo,
  passport.authenticate('local', { failureFlash: true, failureRedirect: 'login' }),
  users.login,
);

router.get('/logout', users.logout);

export default router;
