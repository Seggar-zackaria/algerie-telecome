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

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Algerie Telecom API' });
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
