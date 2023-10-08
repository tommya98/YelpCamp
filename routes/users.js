import express from 'express';
import passport from 'passport';
import User from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';
import { storeReturnTo } from '../middleware.js';

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post(
  '/register',
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash('success', 'Welcome to Yelp camp');
        res.redirect('/campgrounds');
      });
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('/register');
    }
  }),
);

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post(
  '/login',
  storeReturnTo,
  passport.authenticate('local', { failureFlash: true, failureRedirect: 'login' }),
  (req, res) => {
    req.flash('success', 'Welcom back!');
    const redirectURL = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectURL);
  },
);

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds');
  });
});

export default router;
