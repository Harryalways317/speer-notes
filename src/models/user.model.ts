import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating user');
  }
};


const findUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true, // Include the password for authentication purposes
      },
    });

    return user;
  } catch (error) {
    throw new Error('Error finding user');
  }
};

export { createUser, findUserByEmail };