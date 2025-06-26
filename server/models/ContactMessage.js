import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
}, {
  timestamps: true
});

const ContactMessage = mongoose.model("ContactMessage", contactSchema);
export default ContactMessage;
