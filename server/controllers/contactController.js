import ContactMessage from '../models/ContactMessage.js';
// import sendEmail from '../utils/sendEmail.js'; // Optional if email sending is configured

export const contactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    // Optional: send confirmation email
    // await sendEmail(email, "Thanks for contacting us", "We’ll get back to you soon.");

    res.status(200).json({ success: true, message: "Message received!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};
