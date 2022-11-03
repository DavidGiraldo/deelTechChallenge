import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from '../src/server.js';

describe('GET /contracts/:id tests', () => {
    test('Should return a contract by id with status code 200', async () => {
        const contractResponse = await request(app)
            .get('/contracts/2')
            .set('profile_id', '1')
            .send();

        expect(contractResponse.status).toBe(StatusCodes.OK);
    });

    test('Should 404 code searching a contract by id', async () => {
        const contractResponse = await request(app)
            .get('/contracts/2')
            .set('profile_id', '6')
            .send();

        expect(contractResponse.status).toBe(StatusCodes.NOT_FOUND);
    });
});

describe('GET /contracts tests', () => {
    test('Should return non terminated contracts by user with status code 200', async () => {
        const contractResponse = await request(app)
            .get('/contracts')
            .set('profile_id', '4')
            .send();

        expect(contractResponse.status).toBe(StatusCodes.OK);
        expect(contractResponse.body).toBeInstanceOf(Array);
        expect(contractResponse.body.length).toBe(3);
    });

    test('Should 404 code searching non contracts by user', async () => {
        const contractResponse = await request(app)
            .get('/contracts')
            .set('profile_id', '5')
            .send();

        expect(contractResponse.status).toBe(StatusCodes.NOT_FOUND);
    });
});

describe('GET /jobs/unpaid tests', () => {
    test('Should return status 200 for unpaid jobs ', async () => {
        const contractResponse = await request(app)
            .get('/jobs/unpaid')
            .set('profile_id', '2')
            .send();

        expect(contractResponse.status).toBe(StatusCodes.OK);
        expect(contractResponse.body).toBeInstanceOf(Array);
        expect(contractResponse.body.length).toBe(2);
    });

    test('Should 404 code searching unpaid jobs', async () => {
        const contractResponse = await request(app)
            .get('/jobs/unpaid')
            .set('profile_id', '3')
            .send();

        expect(contractResponse.status).toBe(StatusCodes.NOT_FOUND);
    });
});
