import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  response: { type: String, default: '' }, // Admin's response
});

export default mongoose.model('Contact', ContactSchema);