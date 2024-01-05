import {Router} from 'express';
import { signupHandler, loginHandler } from '../controllers';
import {  body } from 'express-validator';
const router = Router();
//validations
export const validateSignup = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ];
  
  export const validateLogin = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').not().isEmpty().withMessage('Password is required')
  ];

// Signup route
router.post('/signup', validateSignup,signupHandler);

// Login route
router.post('/login', validateLogin,loginHandler);

export default router;
