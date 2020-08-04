import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cron from 'node-cron';
import { resolve } from 'path';

import './database';
import './database/mongoConnect';

import { getReminders } from './socketio';

import appErrors from './middlewares/exceptionHandlers';
import userRoutes from './modules/user/routes';
import adminRoutes from './modules/admin/routes';

// import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use('/admin', adminRoutes);

app.use(appErrors);

app.use('/files', express.static(resolve(__dirname, '..', 'tmp')));

cron.schedule('9 19 * * *', async () => {
  console.log('hora da verdade');
  await getReminders();
});

export default app;
