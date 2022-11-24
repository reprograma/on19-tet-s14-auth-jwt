const app = require("./src/app")

const DB_PORT = process.env.DB_PORT

app.listen(DB_PORT, () => {
    console.log(`Servidor está rodando na porta ${DB_PORT}`);
});
