import { Op } from 'sequelize';
import { StatusCodes } from 'http-status-codes';

import { MODELS, PROFILE_ID, TERMINATED } from '../constants/common.constants.js';
import {
    CONTRACT_NOT_FOUND,
    PROFILE_WITHOUT_CONTRACTS
} from '../constants/contracts.constants.js';

// Fixed 😎
export const getContractById = async (req, res) => {
    const profileId = req.get(PROFILE_ID);
    const { id } = req.params

    const { Contract } = req.app.get(MODELS)
    const contract = await Contract.findOne({
        where: {[Op.and]: [{ id }, { ClientId: profileId }]}
    });

    if(!contract) return res.status(StatusCodes.NOT_FOUND).json(
        { message: CONTRACT_NOT_FOUND, status: StatusCodes.NOT_FOUND }
    ).end();

    res.json(contract)
};

export const getNonTerminatedUserContracts = async (req, res) => {
    const profileId = req.get(PROFILE_ID);

    const { Contract } = req.app.get(MODELS)
    const contracts = await Contract.findAll({
        where: {status: {[Op.not]: TERMINATED}, [Op.and]: [{ [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }]}]}
    });

    if(!contracts.length) return res.status(StatusCodes.NOT_FOUND).json(
        { message: PROFILE_WITHOUT_CONTRACTS, status: StatusCodes.NOT_FOUND }
    ).end();

    res.json(contracts);
};
