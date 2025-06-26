import express from 'express';
import { contactForm } from '../controllers/contactController.js';

const router = express.Router();

router.post('/contact', contactForm);

export default router;
