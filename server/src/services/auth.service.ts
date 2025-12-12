import bcrypt from 'bcrypt';
import { prisma } from '../prisma.js';
import generateToken from '../utils/generateToken.js';
import { AppError } from '../utils/AppError.js';

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(String(user.id)),
    };
  }
  
  throw new AppError('Invalid email or password', 401);
};

export const registerAdmin = async (data: { name: string; email: string; password: string }) => {
  const { name, email, password } = data;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new AppError('User already exists', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  if (user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(String(user.id)),
    };
  }
  
  throw new AppError('Invalid user data', 400);
};
