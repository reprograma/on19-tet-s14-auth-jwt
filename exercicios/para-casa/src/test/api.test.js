const request = require('supertest');
const app = require('../app.js');

let elementId;

describe("API test", () => {
    it("GET /tarefas", (done) => {
        request(app)
        .get("/tarefas")
        .expect(200)
        .expect((res) => {
            expect(res.body.length).not.toBe(0);
        })
        .end((err, res) => {
            if (err) return done (err);
            return done();
        })
    })
})