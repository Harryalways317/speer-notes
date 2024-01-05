import { Note, SharedNote } from '@prisma/client';
import { prisma } from '../config';

const getNotesByUserId = async (userId: string): Promise<Note[]> => {
  return prisma.note.findMany({
    where: {
      OR: [
        { authorId: userId },
        {
          shared: {
            some: {
              sharedWithId: userId,
            },
          },
        },
      ],
    },
    include: {
      shared: true,
    },
  });
};

const getNoteByIdAndUserId = async (
  noteId: string,
  userId: string
): Promise<Note | null> => {
  return prisma.note.findFirst({
    where: {
      id: noteId,
      OR: [
        { authorId: userId },
        {
          shared: {
            some: {
              sharedWithId: userId,
            },
          },
        },
      ],
    },
  });
};

const createNoteForUser = async (
  title: string,
  content: string,
  userId: string
): Promise<Note> => {
  return prisma.note.create({
    data: { title, content, authorId: userId },
  });
};

const updateNoteByIdAndUserId = async (
  noteId: string,
  userId: string,
  updatedData: { title?: string; content?: string }
): Promise<Note> => {
  return prisma.note.update({
    where: { id: noteId, authorId: userId },
    data: updatedData,
  });
};

const deleteNoteByIdAndUserId = async (
  noteId: string,
  userId: string
): Promise<void> => {
  await prisma.note.delete({
    where: { id: noteId, authorId: userId },
  });
};

const shareNoteWithUser = async (
  noteId: string,
  ownerId: string,
  sharedWithId: string
): Promise<SharedNote> => {
  return prisma.sharedNote.create({
    data: { noteId, ownerId, sharedWithId },
  });
};

const getNotesSharedWithUser = async (
  userId: string
): Promise<SharedNote[]> => {
  return prisma.sharedNote.findMany({
    where: { sharedWithId: userId },
  });
};

const getNoteSharedWithUserById = async (
  noteId: string,
  userId: string
): Promise<SharedNote | null> => {
  return prisma.sharedNote.findFirst({
    where: { noteId, sharedWithId: userId },
  });
};

const searchUserNotes = async (
  userId: string,
  query: string
): Promise<Note[]> => {
  return prisma.note.findMany({
    where: {
      authorId: userId,
      OR: [{ title: { contains: query } }, { content: { contains: query } }],
    },
  });
};

export {
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
