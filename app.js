import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Campground from './models/campground.js';

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs');
const __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/makecampground', async (req, res) => {
  const camp = new Campground({ title: 'My Backyard', description: 'cheap camping!' });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
