
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';

import { notFound, errorHandler } from './middleware/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import heroSlideRoutes from './routes/heroSlide.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import contentRoutes from './routes/content.routes.js';
import registrationRoutes from './routes/registration.routes.js';
import statsRoutes from './routes/stats.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    process.env.BASE_URL,
    'http://localhost:5173',
    'http://localhost:4173'
  ].filter((origin): origin is string => !!origin),
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hero-slides', heroSlideRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/stats', statsRoutes);

// Static Uploads
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Root
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Algerie Telecom API' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
