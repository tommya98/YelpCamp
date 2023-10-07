import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  emial: {
    type: String,
    requried: true,
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);
