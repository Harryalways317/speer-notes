import { Router } from 'express';
import {
  getAllNotesHandler,
  getNoteByIdHandler,
  createNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
  shareNoteHandler,
  searchNotesHandler,
} from '../controllers';
import { signupHandler, loginHandler } from '../controllers';
import { body } from 'express-validator';
import { isAuth } from '../middlewares/auth.middleware';
const router = Router();

//validations
export const validateSignup = [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const validateLogin = [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password').not().isEmpty().withMessage('Password is required'),
];

// Signup route
router.post('/signup', validateSignup, signupHandler);

// Login route
router.post('/login', validateLogin, loginHandler);

router.get('/notes', isAuth, getAllNotesHandler);
router.get('/notes/:id', isAuth, getNoteByIdHandler);
router.post('/notes', isAuth, createNoteHandler);
router.put('/notes/:id', isAuth, updateNoteHandler);
router.delete('/notes/:id', isAuth, deleteNoteHandler);
router.post('/notes/:id/share', isAuth, shareNoteHandler);
router.get('/search', isAuth, searchNotesHandler);

export default router;
