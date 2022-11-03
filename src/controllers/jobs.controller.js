import { StatusCodes } from 'http-status-codes';

import { PROFILE_ID, TERMINATED } from '../constants/common.constants.js';
import { NO_UNPAID_JOBS_FOUND } from '../constants/jobs.constants.js';

export const getUnpaidJobs = async (req, res) => {
    const profileId = req.get(PROFILE_ID);
    const { Job } = req.app.get('models');
    const sequelize = req.app.get('sequelize');

    const result = await sequelize.query(
        `SELECT * FROM Jobs j
        WHERE j.ContractId IN (SELECT c.id FROM Contracts c
        WHERE c.ContractorId = ${ profileId } or c.ClientId = ${ profileId }
        AND c.status NOT IN ('${ TERMINATED }'))`,
        Job,
        {raw: false}
    );

    const filteredUnpaidJobs = result[0]?.filter(job => !job.paid);

    if(!filteredUnpaidJobs.length) return res.status(StatusCodes.NOT_FOUND).json({
        message: NO_UNPAID_JOBS_FOUND,
        status: StatusCodes.NOT_FOUND
    }).end();

    res.json(filteredUnpaidJobs);
};
