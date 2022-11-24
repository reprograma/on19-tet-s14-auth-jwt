const request = require("supertest");
const app = require("../app.js");
const jwt = require("jsonwebtoken");

let elementId;
//let token;

describe("API test", () => {
    test("Rota Get /tarefas", (done) => {
        request(app)
            .get("/tarefas/tarefas")
            .expect(200)
            .expect((res) => {
                expect(res.body.lenght).not.toBe
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
    })
})

/*test("Rota Post /novaTarefa", (done) => {
    request(app)
        .post("/tarefas/novaTarefa")
        .expect("Content-Type", /json/)
        .send({
            descricao: "validando testes",
            dataInclusao: "24/11/2022",
            concluido: "true",
            nomeColaboradora: "Tereza",
            senha: "javascript"
        })
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            elementId = res.body.savedUser._id;
            jest.setTimeout(newTimeout);
            return done();
        })
})

test("Rota Post /login", (done) => {
    request(app)
        .post("/tarefas/login")
        .expect("Content-Type", /json/)
        .send({
            nomeColaboradora: "Tereza",
            senha: "javascript"
        })
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            token = jwt.sign({ nomeColaboradora: req.body.nomeColaboradora }, SECRET);
            return done();
        })
})*/