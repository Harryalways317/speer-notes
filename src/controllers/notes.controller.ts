import { Request, Response } from 'express';
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
} from '../models';

const getAllNotesHandler = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const userId = req.body.user.id;
    const notes = await getNotesByUserId(userId);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notes' });
  }
};

const getNoteByIdHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const noteId = req.params.id;
    const note = await getNoteByIdAndUserId(noteId, userId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the note' });
  }
};

const createNoteHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    console.log(userId);
    const { title, content } = req.body;
    const newNote = await createNoteForUser(title, content, userId);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating the note' });
  }
};

const updateNoteHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const noteId = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await updateNoteByIdAndUserId(noteId, userId, {
      title,
      content,
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error updating the note' });
  }
};

const deleteNoteHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const noteId = req.params.id;
    await deleteNoteByIdAndUserId(noteId, userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the note' });
  }
};

const shareNoteHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const noteId = req.params.id;
    const { sharedWithId } = req.body; // User ID of the user we want to share with
    const sharedNote = await shareNoteWithUser(noteId, userId, sharedWithId);
    res.json(sharedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error sharing the note' });
  }
};

const searchNotesHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const query = req.query.q as string;
    console.log(query);
    const notes = await searchUserNotes(userId, query);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for notes' });
  }
};

export {
  getAllNotesHandler,
  getNoteByIdHandler,
  createNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
  shareNoteHandler,
  searchNotesHandler,
};
