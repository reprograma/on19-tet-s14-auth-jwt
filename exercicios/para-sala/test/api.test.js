const request = require('supertest')
const app = require('../test/app.js');

let elementId;

describe("API TEST", () => {
    test("GET /colaboradoras",(done) =>{
        request(app)
        .get("/colaboradoras")
        .expect(200)
        .expect((res)=>{
            expect(res.body.length).not.toBe(0);
            
        })
        .end((err, res) => {
            if (err) return done (err);
            return done();
        })

    })

})