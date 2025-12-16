import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  // TODO: Adjust limits based on production needs
  max: process.env.NODE_ENV === 'production' ? 5 : 100, // Limit each IP to 5 login requests per window in prod, 100 in dev
  message: {
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // Limit 1000 requests 
  message: {
    message: 'Too many requests from this IP, please try again after an hour',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
