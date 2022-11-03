import { StatusCodes } from 'http-status-codes';
import { DEFAULT_NON_AUTHORIZED_PROFILE } from '../constants/common.constants.js';

export const getProfile = async (req, res, next) => {
    const { Profile } = req.app.get('models')
    const profile = await Profile.findOne({where: {id: req.get('profile_id') || 0}})
    
    if(!profile) return res.status(StatusCodes.UNAUTHORIZED).json({
        message: DEFAULT_NON_AUTHORIZED_PROFILE,
        status: StatusCodes.UNAUTHORIZED
    }).end()

    req.profile = profile
    next()
};
