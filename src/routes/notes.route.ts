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
import { body, query } from 'express-validator';
import { isAuth } from '../middlewares/auth.middleware';
const router = Router();

//validations
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

const validateCreateNote = [
  body('title').trim().not().isEmpty().withMessage('Title is required'),
  body('content').optional().trim(),
];

const validateUpdateNote = [
  body('title').optional().trim(),
  body('content').optional().trim(),
];

const validateShareNote = [
  body('sharedWithId')
    .not()
    .isEmpty()
    .withMessage('Shared user ID is required'),
];

const validateSearchNotes = [
  query('q').trim().not().isEmpty().withMessage('Search query is required'),
];

// Signup route
router.post('/signup', validateSignup, signupHandler);

// Login route
router.post('/login', validateLogin, loginHandler);

router.get('/notes', isAuth, getAllNotesHandler);
router.get('/notes/:id', isAuth, getNoteByIdHandler);
router.post('/notes', isAuth, ...validateCreateNote, createNoteHandler);
router.put('/notes/:id', isAuth, ...validateUpdateNote, updateNoteHandler);
router.delete('/notes/:id', isAuth, deleteNoteHandler);
router.post('/notes/:id/share', isAuth, ...validateShareNote, shareNoteHandler);
router.get('/search', isAuth, ...validateSearchNotes, searchNotesHandler);

export default router;
