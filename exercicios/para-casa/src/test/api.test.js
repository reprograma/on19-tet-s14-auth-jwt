const request = require("supertest");
const app = require("../app.js");

let elementId;

describe("API test", () => {
    test("Rota Get /agenda/tarefas", (done) => {
        request(app)
            .get("/agenda/tarefas")
            .expect(200)
            .expect((res) => {
                expect(res.body.lenght).not.toBe(0);
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            })
    });

    test("Rota Post /agenda/criar", (done) => {
        request(app)
        .post("/agenda/criar")
        .expect("Content-Type", /json/)
        .send({
            descricao: "Atividade semana 15 - OK",
            dataInclusao: "11/24/2022",
            concluido: "true",
            nomeColaboradora: "Elis",
            matricula: "Brasil"
        })
        .expect(201)
        .end((err, res) => {
            if(err) return done(err);
            elementId = res.body.salvaTarefa._id;
            return done();
        })
    });

    test("Rota Post /agenda/login", (done) => {
        request(app)
        .post("/agenda/login")
        .expect("Content-Type", /json/)
        .send({
            id: elementId,
            matricula: "Brasil"
        })
        .expect(200)
        .end((err, res) => {
            if(err) return done(err);
            return done();
        })
    });

    test("Rota Delete /agenda/deletar/:id", (done) => {
        request(app)
        .delete(`/agenda/deletar/${elementId}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
            expect(res.body.tarefaEncontrada.descricao).toBe("Atividade semana 15 - OK");        
        })
        .end((err,res) => {
            if (err) return done(err);
            return done();
        })
    });

})
