import mongoose from 'mongoose';
import Review from './review.js';

const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  image: [{ url: String, filename: String }],
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

export default mongoose.model('Campground', CampgroundSchema);
