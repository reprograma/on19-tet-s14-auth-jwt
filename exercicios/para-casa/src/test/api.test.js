const request = require('supertest');
const app = require('../app.js');

let elementId;

describe("API test", () => {
    it("GET /colaboradoras", (done) => {
        request(app)
        .get("/colaboradoras")
        .expect(200)
        .expect((res) => {
            expect(res.body.lenght).not.toBe(0);
        })
        .end((err, res) => {
            if (err) return done (err);
            return done();
        })
    })
})