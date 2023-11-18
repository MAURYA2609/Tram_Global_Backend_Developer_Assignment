import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, required: true },
  longURL: { type: String, required: true }
});

const UrlModel = mongoose.model('Url', urlSchema);

export default UrlModel;
