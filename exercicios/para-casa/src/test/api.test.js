const request = require('supertest')
const app = require('../app.js');

let elementId;

describe("API TEST", () => {
    test("GET /tarefas/", (done) => {
        request(app)
            .get("/tarefas/")
            .expect(200)
            .expect((res) => {
                expect(res.body.length).not.toBe(0);

            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
    })

    test("Rota POST /tarefas", (done) => {
        request(app)
            .post("/tarefas")
            .expect("Content-Type", /json/)
            .send({
                id: 13080,
                descricao: "tarefa de casa",
                dataInclusao: "24-11-2022",
                concluido: true,
                nome: "Thays",
                password: "123"
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done
                return done();
            })
    })

})