const app = require("./src/app")

PORT = 3030

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
