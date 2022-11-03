import { Router } from "express";

import { getProfile } from '../middleware/getProfile.js';
import {
    getContractById,
    getNonTerminatedUserContracts
} from '../controllers/contracts.controller.js';

const router = Router();

router.get('/contracts/:id', getProfile, getContractById);
router.get('/contracts', getProfile, getNonTerminatedUserContracts);

export default router;
