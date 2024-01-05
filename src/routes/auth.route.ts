import { signupHandler, loginHandler } from '../controllers';
import { body, query } from 'express-validator';
import { Router } from 'express';
const router = Router();
const validateSignup = [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password').not().isEmpty().withMessage('Password is required'),
];

// Signup route
router.post('/signup', validateSignup, signupHandler);

// Login route
router.post('/login', validateLogin, loginHandler);

export default router;
