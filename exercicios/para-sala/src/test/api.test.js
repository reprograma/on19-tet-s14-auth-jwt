const request = require("supertest");
const app = require("../app");

let elementId;

describe("API test", () =>{
    test("Get route /colaboradoras/all", (done) => {
        request(app)
        .get("/colaboradoras/all")
        .expect(200)
        .expect((res) => {
            expect(res.body.lenght).not.toBe(0);
        })
        .end((err, res) => {
            if (err) return done (err);
            return done();
        }) 
    });

    test("Post route /colaboradoras/create", (done) =>{
        request(app)
        .post("/colaboradoras/create")
        .expect("Content-Type", /json/)
        .send({
            name: "Bianca",
            email: "bianca.test@gmai.com",
            password: "aloha"
        })
        .expect(201)
        .end((err,res) => {
            if(err) return done(err);
            elementId = res.body.savedUser._id;
            return done();
        })
    });
});


