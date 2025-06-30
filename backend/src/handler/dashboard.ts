import express from 'express'
const dashboardRouter = express.Router();

import dashboard from '../routes/dashboard';

dashboardRouter.get('/', dashboard)

export default dashboardRouter;