import { createUser, findUserByEmail } from './user.model';

import {
  getNotesByUserId,
  getNoteByIdAndUserId,
  createNoteForUser,
  updateNoteByIdAndUserId,
  deleteNoteByIdAndUserId,
  shareNoteWithUser,
  getNotesSharedWithUser,
  getNoteSharedWithUserById,
  searchUserNotes,
} from './notes.model';

export {
  createUser,
  findUserByEmail,
  getNotesByUserId,
  getNoteByIdAndUserId,
  createNoteForUser,
  updateNoteByIdAndUserId,
  deleteNoteByIdAndUserId,
  shareNoteWithUser,
  getNotesSharedWithUser,
  getNoteSharedWithUserById,
  searchUserNotes,
};
