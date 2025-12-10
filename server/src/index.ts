import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

import authRoutes from './routes/auth.routes.js';
import heroSlideRoutes from './routes/heroSlide.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/hero-slides', heroSlideRoutes);

import uploadRoutes from './routes/upload.routes.js';
import path from 'path';

app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

import contentRoutes from './routes/content.routes.js';
import registrationRoutes from './routes/registration.routes.js';

app.use('/api/content', contentRoutes);
app.use('/api/registrations', registrationRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Algerie Telecom API' });
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
