const request = require("supertest");
const app = require("../app");

let elementId;

describe("API test", () =>{
    test("Get route /colaboradoras/", (done) => {
        request(app)
        .get("/colaboradoras/")
        .expect(200)
        .expect((res) => {
            expect(res.body.lenght).not.toBe(0);
        })
        .end((err, res) => {
            if (err) return done (err);
            return done();
        }) 
    });
});