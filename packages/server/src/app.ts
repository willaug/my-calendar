import express from 'express';
import dotEnv from 'dotenv';

const app = express();
dotEnv.config();

export default app;
