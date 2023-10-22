import mongoose from 'mongoose';
import Campground from '../models/campground.js';
import cities from './cities.js';
import { places, descriptors } from './seedHelpers.js';

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: `65237aa6b27624183840f884`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe mollitia impedit corporis delectus eaque iste neque dolorum vel tempore quos ut itaque quasi nobis, asperiores placeat ducimus ratione cum earum!',
      price,
      geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
      images: [
        {
          url: 'https://res.cloudinary.com/dtm3cksar/image/upload/v1697340628/YelpCamp/utbatgzqyhvhq44majwi.jpg',
          filename: 'YelpCamp/utbatgzqyhvhq44majwi',
        },
        {
          url: 'https://res.cloudinary.com/dtm3cksar/image/upload/v1697340630/YelpCamp/iwpbckf0ubryivfqnzb2.jpg',
          filename: 'YelpCamp/iwpbckf0ubryivfqnzb2',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
