const request = require('supertest');
const server = require('../../server');
const API = 'localhost:3000'

describe('GET /tarefas', () => {
    it('should to list all tasks in the database', async () => {
        const response = await request(API)
        .get('/tarefas/');

        expect(response.status).toBe(200);
    })

    it('should return error "page not fount"', async () => {
        const response = await request(API)
        .get('/tarefa/');

        expect(response.status).toBe(404);
    })

});