import { Router } from "express";

import { getProfile } from '../middleware/getProfile.js';
import { getUnpaidJobs } from '../controllers/jobs.controller.js';

const router = Router();

router.get('/jobs/unpaid', getProfile, getUnpaidJobs);

export default router;
